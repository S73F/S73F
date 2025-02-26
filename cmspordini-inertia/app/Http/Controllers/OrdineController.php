<?php

namespace App\Http\Controllers;

use App\Models\Ordine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;


class OrdineController extends Controller
{
    public function showCreazione()
    {
        return Inertia::render("Cliente/CreazioneOrdine");
    }

    public function showStorico()
    {
        return Inertia::render("Cliente/StoricoOrdini");
    }

    public function creazione(Request $request)
    {
        try {
            // Validazione dei dati
            $request->validate([
                'medico_ordinante' => 'required|string|max:50',
                'paziente_nome' => 'required|string|max:50',
                'paziente_cognome' => 'required|string|max:50',
                'indirizzo_spedizione' => 'required|string|max:50',
                'lavorazione' => 'required|string|max:250',
                'colore' => 'required|string|max:100',
                'piattaforma' => 'nullable|string',
                'data_cons' => 'required|date',
                'ora_cons' => 'required',
                'note' => 'nullable|string',
                'userfile' => 'nullable|file|mimes:zip,pdf,stl',
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
                'note' => $request->note ?? '',
                'note_int' => '',
                'note_ulti_mod' => now(),
                'utente_modifica' => '-',
                'fileok' => 0,
                'file_fin' => 0,
            ]);

            // Gestione del file
            if ($request->hasFile('userfile') && $request->file('userfile')->isValid()) {
                $file = $request->file('userfile');
                $extension = $file->getClientOriginalExtension();
                $newFileName = "Cliente_{$request->paziente_cognome}_{$request->paziente_nome}_{$ordine->IDordine}.{$extension}";

                // Salva il file nella cartella storage/app/public/uploads
                $file->storeAs('uploads', $newFileName, 'public');

                // Aggiorna l'ordine con il nome del file
                $ordine->update([
                    'fileok' => 1,
                    'nomefile' => $newFileName,
                ]);
                return redirect()->intended('/cliente/dashboard')->with(['success' => 'Ordine creato e file caricato con successo!']);
            } else {
                return redirect()->intended('/cliente/dashboard')->with(['success' => 'Ordine creato con successo!']);
            }
        } catch (ValidationException $e) {
            // Log tramite toast degli errori
            $errors = $e->validator->errors();
            return redirect()->back()->with(["error" => "Errore durante la creazione dell'ordine", "validation_errors" => $errors])->withInput();
        }
    }

    public function getStorico(Request $request)
    {
        $tempo = $request->input('q');
        $idCliente = Auth::guard('cliente')->user()->IDcliente;

        $query = Ordine::where('IDcliente', $idCliente);

        if ($tempo === "30") {
            $query->whereBetween("data", [now()->subDays(30), now()]);
        } elseif ($tempo === "60") {
            $query->whereBetween("data", [now()->subDays(60), now()]);
        }

        $ordini = $query->orderBy('data', "desc")->get();

        return response()->json($ordini);
    }

    public function generaPDF($id)
    {
        $ordine = Ordine::with('cliente')->find($id);

        $pdf = Pdf::loadView("cliente.ordinePDF", compact("ordine"));

        return $pdf->stream("ordine_{$ordine->IDordine}.pdf");
    }

    public function aggiornaStato($IDordine, Request $request)
    {
        $ordine = Ordine::find($IDordine);
        $ordine->update(['stato' => 1, 'data_inizioLavorazione' => now(), 'IDoperatore' => $request->user()->IDoperatore]);

        return redirect()->intended('/operatore/dashboard');
        // ->with('success', 'Hai preso in carico il lavoro. Caricamento PDF in corso...')
    }
}
