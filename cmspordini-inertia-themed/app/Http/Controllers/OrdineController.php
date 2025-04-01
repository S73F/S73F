<?php

namespace App\Http\Controllers;

use App\Jobs\CreazioneOrdineMailJob;
use App\Jobs\TermineOrdineMailJob;
use App\Models\Operatore;
use App\Models\Ordine;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class OrdineController extends Controller
{

    /**
     * Crea un nuovo ordine e gestisce il file caricato.
     * 
     * @param Request $request - La richiesta HTTP contenente i dati del nuovo ordine.
     * @return \Illuminate\Http\RedirectResponse - Ritorna una risposta di reindirizzamento.
     * @throws ValidationException - Se i dati non sono validi.
     */
    public function creazione(Request $request)
    {
        try {
            // Validazione dei dati in ingresso
            $request->validate([
                'medico_ordinante' => 'required|string|max:50',
                'paziente_nome' => 'required|string|max:50',
                'paziente_cognome' => 'required|string|max:50',
                'indirizzo_spedizione' => 'required|string|max:50',
                'lavorazione' => 'required|string|max:1000',
                'colore' => 'required|string|max:100',
                'piattaforma' => 'nullable|string|max:1000',
                'data_cons' => 'required|date',
                'ora_cons' => 'required',
                'note' => 'nullable|string|max:1000',
                'userfile' => 'required|file|mimes:zip,pdf,stl',
            ], [
                'required' => 'Il campo :attribute è obbligatorio.',
                'max' => 'Il campo :attribute non può superare i :max caratteri.',
                'mimes' => 'Il file deve avere uno dei seguenti formati: :values.',
            ]);

            // Calcolo del numero progressivo per l'anno corrente
            $anno = date('Y');
            $numero = Ordine::whereYear('data', $anno)->max('numero') + 1;

            // Creazione dell'ordine
            $ordine = Ordine::create([
                'IDcliente' => Auth::guard('cliente')->user()->IDcliente,
                'numero' => $numero,
                'data' => now(),
                'medicoOrdinante' => $request->medico_ordinante,
                'PazienteNome' => $request->paziente_nome,
                'PazienteCognome' => $request->paziente_cognome,
                'IndirizzoSpedizione' => $request->indirizzo_spedizione,
                'lavorazione' => $request->lavorazione,
                'colore' => $request->colore,
                'piattaforma' => $request->piattaforma ?? '',
                'data_cons' => $request->data_cons,
                'ora_cons' => $request->ora_cons,
                'stato' => 0,
                'fileok' => 0,
                'note' => $request->note ?? '',
                'note_int' => '',
            ]);

            // Se la richiesta contiene un file valido, salva il file nello storage pubblico
            if ($request->hasFile('userfile') && $request->file('userfile')->isValid()) {
                // Recupera il file caricato
                $file = $request->file('userfile');

                // Recupera l'estensione del file
                $extension = $file->getClientOriginalExtension();

                // Assegna il nome al file sorgente
                $newFileName = Auth::guard('cliente')->user()->ragione_sociale . "_" . strtoupper($request->paziente_cognome) . "_" . strtoupper($request->paziente_nome) . "_" . $ordine->IDordine . "." . $extension;

                // Salva il file nella cartella storage/app/public/uploads
                $file->storeAs('uploads', $newFileName, 'public');

                // Aggiorna l'ordine con il nome del file
                $ordine->update([
                    'fileok' => 1,
                    'nomefile' => $newFileName,
                ]);

                // Seleziona tutte le mail degli operatori presenti nel database
                $mailOperatori = Operatore::pluck("emailoperatore");

                // Avvia un job asincrono per inviare un'email di notifica al cliente e agli operatori,  
                // informandoli della creazione del nuovo ordine.
                dispatch(new CreazioneOrdineMailJob(['mailCliente' => Auth::guard('cliente')->user()->emailcliente, 'ragioneSociale' => Auth::guard('cliente')->user()->ragione_sociale, 'numero' => $numero, 'anno' => $anno, 'mailOperatori' => $mailOperatori]));

                return redirect('/cliente/dashboard')->with(['success' => 'Ordine creato e file caricato con successo!']);
            } else {
                return redirect('/cliente/dashboard')->with(['success' => 'Ordine creato con successo!']);
            }
        } catch (ValidationException $e) {
            // Log tramite toast degli errori
            $errors = $e->validator->errors();
            return redirect()->back()->with(["error" => "Errore durante la creazione dell'ordine", "validation_errors" => $errors])->withInput();
        }
    }

    /**
     * Restituisce il numero di lavori nuovi (stato = 0).
     * 
     * @return int - Numero di lavori nuovi.
     */
    public function getNumeroLavori()
    {
        // Recupera il numero di lavori nuovi dal database
        $numeroLavoriNuovi = Ordine::where('stato', 0)->count();

        return $numeroLavoriNuovi;
    }

    /**
     * Genera un PDF dell'ordine.
     * 
     * @param int $id - ID dell'ordine.
     * @return \Illuminate\Http\Response - Risposta con il PDF generato.
     */
    public function generaPDF($id)
    {
        // Definizione dei campi da restituire alla vista del PDF
        $fields = ['IDordine', 'IDcliente', 'numero', 'data', 'medicoOrdinante', 'PazienteNome', 'PazienteCognome', 'IndirizzoSpedizione', 'lavorazione', 'colore', 'piattaforma', 'data_cons', 'ora_cons', 'note'];

        // Se l'utente loggato è un operatore, aggiunge all'array $fields i campi seguenti
        if (Auth::guard('operatore')->check()) {
            $fields = array_merge($fields, ['utente_modifica', 'note_int', 'note_ulti_mod']);
        }

        // Recupera i dati dell'ordine selezionato
        $ordine = Ordine::select($fields)->with('cliente:IDcliente,ragione_sociale,indirizzo,citta,provincia')->find($id);

        // Generazione del PDF con i dati presenti nei campi selezionati
        $pdf = Pdf::loadView("PDF.ordinePDF", compact("ordine"));

        // Viene aperto il PDF all'interno di una nuova finestra del browser
        return $pdf->stream("ordine_{$ordine->IDordine}.pdf");
    }

    /**
     * Aggiorna lo stato di un ordine, avanzando allo stato successivo o annullando l'ordine.
     * 
     * @param Request $request - La richiesta HTTP contenente i dati dell'operatore.
     * @param int $IDordine - ID dell'ordine da aggiornare.
     * @param string $option - Opzione per avanzare o annullare l'ordine (default è "forward").
     * @return \Illuminate\Http\RedirectResponse - Ritorna una risposta di reindirizzamento.
     * @throws Exception - Se si verifica un errore durante l'aggiornamento.
     */
    public function aggiornaStato(Request $request, $IDordine, $option = "forward")
    {
        // Recupera i dati dell'ordine selezionato
        $ordine = Ordine::select('IDordine', 'IDoperatore', 'IDcliente', 'numero', 'data', 'stato')->with(['operatore:IDoperatore,nome,cognome', 'cliente:IDcliente,emailcliente'])->find($IDordine);

        // Se l'ordine non esiste nel database, effettua un redirect con l'errore
        if (!$ordine) {
            return redirect()->back()->withErrors('Ordine non trovato');
        }

        try {
            // Se a $option viene passato come argomento "forward", effettua le successive verifiche
            if ($option == "forward") {

                switch ($ordine->stato) {
                    // Se l'ordine è nello stato iniziale (0), aggiorna lo stato impostandolo a "In lavorazione" (1),  
                    // registra la data di inizio lavorazione e assegna l'ordine all'operatore corrente.  
                    // Infine, effettua un redirect alla pagina corrente con un messaggio di conferma.
                    case 0:
                        $ordine->update(['stato' => 1, 'data_inizioLavorazione' => now(), 'IDoperatore' => $request->user()->IDoperatore]);

                        return redirect('/operatore/dashboard?tipo=nuovi')->with('success', 'Hai preso in carico il lavoro.');


                    // Se l'ordine è nello stato "In lavorazione" (1), aggiorna lo stato impostandolo a "Spedito" (2)  
                    // e registra la data di spedizione.  
                    // Invia inoltre un'email di notifica al cliente con i dettagli dell'ordine e dell'operatore responsabile.  
                    // Infine, effettua un redirect con un messaggio di conferma.
                    case 1:
                        $ordine->update(['stato' => 2, 'data_spedizione' => now()]);

                        // Avvia un job asincrono per inviare un'email di notifica al cliente,  
                        // informandolo della spedizione dell'ordine.
                        dispatch(new TermineOrdineMailJob(['mailCliente' => $ordine->cliente->emailcliente, 'numero' => $ordine->numero, 'anno' => Carbon::parse($ordine->data)->format('Y'), 'nomeOperatore' => $ordine->operatore->nome, 'cognomeOperatore' => $ordine->operatore->cognome]));

                        return redirect('/operatore/dashboard?tipo=inCorso')->with('success', 'Hai spedito la lavorazione.');


                    // Se lo stato dell'ordine non corrisponde né a 0 né a 1, viene lanciata un'eccezione
                    default:
                        throw new Exception("Stato dell'ordine non valido. Contattare un amministratore");
                }

            } else {
                // Se a $option viene passato un argomento differente da "forward" (es: "back"), l'ordine viene annullato e riportato a stato 0
                $ordine->update(['data_inizioLavorazione' => null, 'stato' => 0, 'data_spedizione' => null, "note_int" => "", 'note_ulti_mod' => null, 'utente_modifica' => "-", "file_fin" => 0, 'file_fin_nome' => null]);
                return redirect('/operatore/dashboard?tipo=inCorso')->with('success', "Hai annullato l'incarico e ripristinato l'ordine.");
            }

        } catch (Exception $e) {
            // Gestione degli errori
            $errors = $e->getMessage();
            return redirect()->back()->with('error', 'ATTENZIONE: si è verificato un errore. Riprova più tardi.')->withErrors($errors);
        }
    }

    /**
     * Scarica il file associato a un ordine.
     * 
     * @param int $id ID dell'ordine.
     * @return \Illuminate\Http\RedirectResponse|\Symfony\Component\HttpFoundation\StreamedResponse - Risposta per il download del file.
     */
    public function downloadFile($id)
    {
        // Seleziona il nome del file corrispondente all'ordine selezionato
        $fileName = Ordine::where('IDordine', $id)->value('nomefile');

        // Se il nome del file non viene trovato nel database, effettua un redirect con l'errore
        if (!$fileName) {
            return redirect()->back()->with(['error' => 'File non trovato nel database.']);
        }

        // Se il file esiste nello storage pubblico, effettua il download del file
        if (Storage::disk('public')->exists("uploads/{$fileName}")) {
            return Storage::disk('public')->download("uploads/{$fileName}");
        } else {
            // Se il nome del file viene trovato nel database ma non nello storage, effettua un redirect con l'errore
            return redirect()->back()->with(['error' => 'Il file non esiste nel server.']);
        }
    }

    /**
     * Scarica il file finale di un ordine.
     * 
     * @param int $id ID dell'ordine.
     * @return \Illuminate\Http\RedirectResponse|\Symfony\Component\HttpFoundation\StreamedResponse - Risposta per il download del file finale.
     */
    public function downloadFileFinale($id)
    {
        // Seleziona il nome del file finale corrispondente all'ordine selezionato
        $fileName = Ordine::where('IDordine', $id)->value('file_fin_nome');

        // Se il nome del file finale non viene trovato nel database, effettua un redirect con l'errore
        if (!$fileName) {
            return redirect()->back()->with(['error' => 'File non trovato nel database.']);
        }

        // Se il file finale esiste nello storage pubblico, effettua il download del file finale
        if (Storage::disk('public')->exists("uploads/{$fileName}")) {
            return Storage::disk('public')->download("uploads/{$fileName}");
        } else {
            // Se il nome del file finale viene trovato nel database ma non nello storage, effettua un redirect con l'errore
            return redirect()->back()->with(['error' => 'Il file non esiste nel server.']);
        }
    }
}
