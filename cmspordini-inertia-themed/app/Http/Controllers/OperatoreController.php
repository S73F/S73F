<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Ordine;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class OperatoreController extends Controller
{
    /**
     * Mostra la dashboard dell'operatore con i lavori da gestire.
     *
     * @param Request $request - La richiesta HTTP.
     * @return \Inertia\Response
     */
    public function showDashboard(Request $request)
    {
        // Recupera il tipo di lavori da visualizzare, default a "nuovi"
        $tipo = $request->query('tipo', "nuovi");

        $lavori = [];

        // Se il tipo passato è "nuovi", recupera gli ordini nuovi
        if ($tipo == "nuovi") {
            $lavori = Ordine::select("IDordine", "IDcliente", "medicoOrdinante", "PazienteNome", "PazienteCognome", "data")
                ->with(["cliente:IDcliente,ragione_sociale"])
                ->where('stato', 0)
                ->orderBy('data', 'desc')
                ->get();
        }

        // Se il tipo passato è "inCorso", recupera gli ordini in corso
        if ($tipo == "inCorso") {
            $lavori = Ordine::select("IDordine", "IDcliente", "IDoperatore", "medicoOrdinante", "PazienteNome", "PazienteCognome", "data", "data_inizioLavorazione", "note_ulti_mod", "file_fin")
                ->with(["cliente:IDcliente,ragione_sociale", "operatore:IDoperatore,nome,cognome"])
                ->where('stato', 1)
                ->orderBy('data_inizioLavorazione', 'desc')
                ->get();
        }

        // Se il tipo passato è "spediti", recupera gli ordini spediti
        if ($tipo == "spediti") {
            $lavori = Ordine::select("IDordine", "IDcliente", "IDoperatore", "medicoOrdinante", "PazienteNome", "PazienteCognome", "data", "data_inizioLavorazione", "data_spedizione", "file_fin")
                ->with(["cliente:IDcliente,ragione_sociale", "operatore:IDoperatore,nome,cognome"])
                ->where('stato', 2)
                ->orderBy('data_spedizione', 'desc')
                ->get();
        }

        // Conta il numero di ordini nuovi
        $numLavoriNuovi = Ordine::where('stato', 0)->count();

        // Renderizza la vista della dashboard con i dati necessari
        return Inertia::render("Operatore/Dashboard", ["tipo" => $tipo, "lavori" => $lavori, "numLavoriNuovi" => $numLavoriNuovi]);
    }

    /**
     * Mostra la pagina di gestione clienti.
     *
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function showGestioneClienti()
    {
        try {
            // Recupera tutti i clienti ordinati per ID
            $clienti = Cliente::select('IDcliente', 'ragione_sociale', 'nome', 'cognome', 'emailcliente', 'username')
                ->orderBy('IDcliente', 'desc')
                ->get();
            return Inertia::render('Operatore/GestioneClienti', ["clienti" => $clienti]);
        } catch (Exception $e) {
            return redirect()->back()->with(["error" => "Errore durante il recupero dei clienti"]);
        }
    }

    /**
     * Recupera e mostra gli ordini di un cliente specifico.
     *
     * @param int|null $IDcliente - ID del cliente facoltativo, inizializzato a null.
     * @return \Inertia\Response
     */
    public function showOrdiniCliente($IDcliente = null)
    {
        // Recupera la lista dei clienti
        $clienti = Cliente::select('IDcliente', 'ragione_sociale')->get();

        $ordini = [];

        // Se è fornito l'IDcliente, recupera gli ordini per quel cliente
        if ($IDcliente) {
            $ordini = Ordine::where('IDcliente', $IDcliente)
                ->with([
                    'operatore' => function ($query) {
                        $query->select('IDoperatore', 'nome', 'cognome');
                    },
                    'cliente' => function ($query) {
                        $query->select('IDcliente', 'ragione_sociale');
                    }
                ])
                ->select(
                    'IDordine',
                    'IDoperatore',
                    'IDcliente',
                    'medicoOrdinante',
                    'PazienteNome',
                    'PazienteCognome',
                    'stato',
                    'data',
                    'data_inizioLavorazione',
                    'data_spedizione',
                    'file_fin',
                )
                ->orderByDesc('data')
                ->get();

            // Renderizza la vista con gli ordini del cliente
            return Inertia::render('Operatore/OrdiniClienti', ["clienti" => $clienti, "ordini" => $ordini]);
        } else {
            // Se non viene passato l'IDcliente, mostra solo la lista dei clienti, senza alcun ordine
            return Inertia::render('Operatore/OrdiniClienti', ["clienti" => $clienti]);
        }
    }

    /**
     * Mostra la modale per la creazione di un cliente.
     *
     * @return \Inertia\Response
     */
    public function showCreateClienteModal()
    {
        return Inertia::render('Modals/CreazioneCliente');
    }

    /**
     * Aggiunge un nuovo cliente nel database.
     *
     * @param Request $request - La richiesta HTTP contenente i dati del cliente.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function createCliente(Request $request)
    {
        try {
            // Validazione dei dati di input
            $request->validate([
                'ragione_sociale' => 'required|string|max:100',
                'nome' => 'required|string|max:50',
                'cognome' => 'required|string|max:50',
                'partitaIVA' => 'required|string|max:50',
                'indirizzo' => 'required|string|max:50',
                'citta' => 'required|string|max:50',
                'cap' => 'required|integer',
                'provincia' => 'required|string|max:50',
                'emailcliente' => 'required|email|string|max:50',
                'username' => 'required|string|max:20',
                'password' => 'required|string|max:100',
            ], [
                'required' => 'Il campo :attribute è obbligatorio.',
                'max' => 'Il campo :attribute non può superare i :max caratteri.',
                'email' => 'La mail inserita non è valida.',
                'integer' => 'Il campo :attribute deve contenere un numero intero.'
            ]);

            // Creazione del cliente nel database
            $cliente = Cliente::create([
                'ragione_sociale' => $request->ragione_sociale,
                'nome' => $request->nome,
                'cognome' => $request->cognome,
                'partitaIVA' => $request->partitaIVA,
                'indirizzo' => $request->indirizzo,
                'citta' => $request->citta,
                'cap' => $request->cap,
                'provincia' => $request->provincia,
                'emailcliente' => $request->emailcliente,
                'username' => $request->username,
                'password' => bcrypt($request->password),
            ]);

            return redirect('/operatore/gestione-clienti')->with(['success' => 'Cliente creato con successo!', 'newCliente' => $cliente]);

        } catch (ValidationException $e) {
            // Gestione degli errori di validazione
            $errors = $e->validator->errors();
            return redirect()->back()->with(["error" => "Errore durante la creazione del cliente", "validation_errors" => $errors])->withErrors($errors)->withInput();
        }
    }

    /**
     * Mostra la modale per modificare un cliente.
     *
     * @param int $IDcliente - ID del cliente da modificare.
     * @return \Inertia\Response
     */
    public function showModificaClienteModal($IDcliente)
    {
        // Recupera il cliente specificato tramite l'ID
        $cliente = Cliente::find($IDcliente);

        return Inertia::render("Modals/ModificaCliente", ["cliente" => $cliente]);
    }

    /**
     * Aggiorna i dati di un cliente.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $IDcliente - ID del cliente da modificare.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function patchCliente(Request $request, $IDcliente)
    {
        // Recupera il cliente specificato tramite l'ID
        $cliente = Cliente::findOrFail($IDcliente);

        try {
            // Validazione dei dati di input per la modifica
            $validatedData = $request->validate([
                'ragione_sociale' => 'sometimes|nullable|string|max:100',
                'nome' => 'sometimes|nullable|string|max:50',
                'cognome' => 'sometimes|nullable|string|max:50',
                'partitaIVA' => 'sometimes|nullable|string|max:50',
                'indirizzo' => 'sometimes|nullable|string|max:50',
                'citta' => 'sometimes|nullable|string|max:50',
                'cap' => 'sometimes|nullable|integer',
                'provincia' => 'sometimes|nullable|string|max:50',
                'emailcliente' => 'sometimes|nullable|email|string|max:50',
                'username' => 'sometimes|nullable|string|max:20',
                'password' => 'sometimes|nullable|string|max:100',
            ], [
                'required' => 'Il campo :attribute è obbligatorio.',
                'max' => 'Il campo :attribute non può superare i :max caratteri.',
                'email' => 'La mail inserita non è valida.',
                'integer' => 'Il campo :attribute deve contenere un numero intero.',
                'string' => 'Il campo :attribute deve contenere una stringa di testo.'
            ]);

            // Filtra i dati non nulli e non vuoti ricevuti
            $data = array_filter($validatedData, function ($value) {
                return $value !== null && $value !== '';
            });

            // Se ci sono modifiche, aggiorna il cliente con i nuovi dati
            if (!empty($data)) {
                $cliente->fill($data);

                if (!empty($validatedData['password'])) {
                    $cliente->password = bcrypt($validatedData['password']);
                }

                $cliente->update();
            } else {

                // Se non ci sono modifiche, lancia un'eccezione
                throw new Exception("Non è stato modificato alcun dato");
            }

            return redirect()->intended('/operatore/gestione-clienti')->with(['success' => 'Cliente modificato con successo!']);

        } catch (ValidationException $e) {
            // Gestione degli errori di validazione
            $errors = $e->validator->errors();
            return redirect()->back()->with(["error" => "Errore durante la modifica del cliente", "validation_errors" => $errors])->withErrors($errors)->withInput();

        } catch (Exception $e) {
            // Gestione degli altri errori
            $error = $e->getMessage();
            return redirect()->back()->with("error", $error)->withErrors($error);
        }
    }

    /**
     * Mostra la modale per eliminare un cliente.
     *
     * @param int $IDCliente - ID del cliente da eliminare.
     * @return \Inertia\Response
     */
    public function showEliminazioneClienteModal($IDCliente)
    {
        // Recupera il cliente da eliminare
        $cliente = Cliente::select('IDcliente', "ragione_sociale")->find($IDCliente);

        return Inertia::render("Modals/EliminazioneCliente", ["cliente" => $cliente]);
    }

    /**
     * Elimina un cliente.
     *
     * @param int $IDCliente - ID del cliente da eliminare.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deleteCliente($IDCliente)
    {
        // Recupera il cliente da eliminare
        $cliente = Cliente::findOrFail($IDCliente);

        // Elimina il cliente selezionato
        $cliente->delete();

        return redirect('/operatore/gestione-clienti')->with(['success' => 'Cliente eliminato con successo']);
    }

    /**
     * Mostra il modal per eliminare un ordine.
     *
     * @param int $IDordine - L'ID dell'ordine da eliminare.
     * @return \Inertia\Response
     */
    public function showEliminazioneOrdineModal($IDordine)
    {
        // Recupera l'ordine da eliminare
        $ordine = Ordine::select('IDordine', 'stato')->find($IDordine);

        return Inertia::render("Modals/EliminazioneOrdine", ["ordine" => $ordine->IDordine, "stato" => $ordine->stato]);
    }

    /**
     * Elimina un ordine.
     *
     * @param int $IDordine - L'ID dell'ordine da eliminare.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deleteOrdine($IDordine, Request $request)
    {
        // Recupera l'ordine da eliminare
        $ordine = Ordine::findOrFail($IDordine);

        // Elimina l'ordine selezionato
        $ordine->delete();

        // Recupera la query string "stato" attuale, utile per il reindirizzamento alla pagina corretta
        $stato = $request->input('stato', "nuovi");

        // In base alla query string "stato", reindirizza la pagina all'url corretto
        $redirectUrl = ($stato == 'nuovi')
            ? '/operatore/dashboard?tipo=nuovi'
            : '/operatore/dashboard?tipo=inCorso';

        return redirect($redirectUrl)->with('success', 'Lavoro eliminato con successo');
    }

    /**
     * Mostra la modale per la lavorazione di un ordine.
     *
     * @param int $IDordine ID dell'ordine sul quale caricare la lavorazione.
     * @return \Inertia\Response - La risposta con il modal di lavorazione.
     */
    public function showLavorazioneModal($IDordine)
    {
        $ordine = Ordine::select('IDordine', 'note_int')->findOrFail($IDordine);
        return Inertia::render('Modals/Lavorazione', ['ordine' => $ordine->IDordine, 'note_int' => $ordine->note_int]);
    }

    /**
     * Carica una lavorazione per un ordine.
     *
     * @param int $IDordine - ID dell'ordine sul quale caricare la lavorazione.
     * @param Request $request - La richiesta HTTP con il file e le note.
     * @return \Illuminate\Http\RedirectResponse - Redirect con esito del caricamento.
     */
    public function caricaLavorazione($IDordine, Request $request)
    {
        // Seleziona l'ordine sul quale caricare la lavorazione
        $ordine = Ordine::select('IDordine', 'IDcliente', 'PazienteNome', 'PazienteCognome', 'utente_modifica', 'note_ulti_mod', 'file_fin', 'file_fin_nome', 'note_int')->with(['cliente:IDcliente,ragione_sociale'])->findOrFail($IDordine);

        try {
            // Validazione del file caricato (opzionale)
            $request->validate([
                'userfile' => 'nullable|file|mimes:zip,pdf,stl',
            ], [
                'mimes' => 'Il file deve avere uno dei seguenti formati: :values.',
            ]);

            // Se l'utente non carica nulla, lancia un'eccezione
            if (empty($request->note_int) && !$request->hasFile('userfile')) {
                throw new Exception("Non hai modificato la lavorazione");
            }

            // Ottiene l'operatore autenticato
            $operatore = Auth::guard('operatore')->user();
            // Determina il nome dell'utente
            $utenteModifica = trim(($operatore->cognome ?? '') . ' ' . ($operatore->nome ?? ''));
            $fileCaricato = false;
            $noteModificate = false;

            // Se la richiesta contiene un file valido, salva il file nello storage pubblico
            if ($request->hasFile('userfile') && $request->file('userfile')->isValid()) {
                // Recupera il file caricato
                $file = $request->file('userfile');

                // Recupera l'estensione del file
                $extension = $file->getClientOriginalExtension();

                // Assegna il nome al file finale
                $newFileName = $ordine->cliente->ragione_sociale . "_" . strtoupper($ordine->PazienteCognome) . "_" . strtoupper($ordine->PazienteNome) . "_{$ordine->IDordine}_FINALE.{$extension}";

                // Salva il file nella cartella storage/app/public/uploads
                $file->storeAs('uploads', $newFileName, 'public');

                // Aggiorna l'ordine sul quale è stata caricata la lavorazione, con i dati appena elaborati
                $ordine->update([
                    'utente_modifica' => $utenteModifica,
                    'note_ulti_mod' => now(),
                    'file_fin' => 1,
                    'file_fin_nome' => $newFileName,
                ]);

                // Flag utilizzato per segnalare che è stato caricato un file finale
                $fileCaricato = true;
            }

            // Se la richiesta contiene delle note interne, aggiorna il DB con il messaggio inserito
            if (!empty($request->note_int)) {
                $ordine->update([
                    'utente_modifica' => $utenteModifica,
                    'note_ulti_mod' => now(),
                    'note_int' => $request->note_int
                ]);

                // Flag utilizzato per segnalare che sono state caricate delle note interne
                $noteModificate = true;
            }

            // Visualizza il messaggio corretto, in base alle modifiche effettuate
            if ($fileCaricato && $noteModificate) {
                $message = "Lavorazione caricata e note modificate con successo!";
            } elseif ($fileCaricato) {
                $message = "Lavorazione caricata con successo!";
            } else {
                $message = "Note modificate con successo!";
            }

            return redirect('/operatore/dashboard?tipo=inCorso')->with(['success' => $message]);

        } catch (ValidationException $e) {
            // Gestione degli errori di validazione
            $errors = $e->validator->errors();

            return redirect()->back()->with(["error" => "Errore durante il caricamento della lavorazione", "validation_errors" => $errors])->withErrors($errors)->withInput();

        } catch (Exception $e) {
            // Gestione degli altri tipi di errori
            $error = $e->getMessage();

            return redirect()->back()->with("error", $error)->withErrors($error)->withInput();
        }
    }
}
