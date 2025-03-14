<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Ordine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class OperatoreController extends Controller
{
    public function showDashboard()
    {
        $lavoriInCorso = Ordine::with(["cliente", "operatore"])->where("stato", '!=', 0)->orderBy('data_inizioLavorazione', 'desc')->paginate(10);

        $lavoriNuovi = Ordine::with(["cliente", "operatore"])->where('stato', 0)->orderBy('data', 'desc')->get();

        return Inertia::render("Operatore/Dashboard", [
            "lavoriInCorso" => $lavoriInCorso,
            "lavoriNuovi" => $lavoriNuovi
        ]);
    }

    public function showGestioneClienti()
    {
        try {
            $clienti = Cliente::orderBy('IDcliente', 'desc')->paginate(10);
            return Inertia::render('Operatore/GestioneClienti', ["clienti" => $clienti]);
        } catch (\Exception $e) {
            return redirect()->back()->with(["error" => "Errore durante il recupero dei clienti"]);
        }
    }

    public function showOrdiniClienti()
    {
        $clienti = Cliente::get();

        return Inertia::render('Operatore/OrdiniClienti', ["clienti" => $clienti]);
    }

    public function showOrdiniCliente($IDcliente)
    {
        $clienti = Cliente::get();

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
                'IDcliente',
                'IDoperatore',
                'medicoOrdinante',
                'PazienteNome',
                'PazienteCognome',
                'data',
                'data_inizioLavorazione',
                'data_spedizione',
                'file_fin_nome'
            )
            ->orderByDesc('data')
            ->paginate(10);

        return Inertia::render('Operatore/OrdiniClienti', ["clienti" => $clienti, "ordini" => $ordini]);
    }
    public function createCliente(Request $request)
    {
        try {
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

            return redirect()->intended('/operatore/gestione-clienti')->with(['success' => 'Cliente creato con successo!', 'newCliente' => $cliente]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            return redirect()->back()->with(["error" => "Errore durante la creazione del cliente", "validation_errors" => $errors])->withErrors($errors)->withInput();
        }
    }

    public function patchCliente(Request $request, $IDcliente)
    {
        $cliente = Cliente::findOrFail($IDcliente);

        try {
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


            $cliente->fill(array_filter($validatedData, function ($value) {
                return $value !== null && $value !== '';
            }));

            if (!empty($validatedData['password'])) {
                $cliente->password = bcrypt($validatedData['password']);
            }

            $cliente->update();

            return redirect()->intended('/operatore/gestione-clienti')->with(['success' => 'Cliente modificato con successo!']);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            return redirect()->back()->with(["error" => "Errore durante la modifica del cliente", "validation_errors" => $errors])->withErrors($errors)->withInput();
        }
    }

    public function deleteCliente($IDCliente)
    {
        $cliente = Cliente::findOrFail($IDCliente);

        $cliente->delete();

        return redirect()->intended('/operatore/gestione-clienti')->with(['success' => 'Cliente eliminato con successo']);
    }

    public function caricaLavorazione($IDordine, Request $request){
        $ordine=Ordine::with('cliente')->findOrFail($IDordine);

        try{
        $request->validate([
            'userfile' => 'required|file|mimes:zip,pdf,stl',
            ], [
                'required' => "L'inserimento del file è obbligatorio.",
                'mimes' => 'Il file deve avere uno dei seguenti formati: :values.',
            ]);

            if ($request->hasFile('userfile') && $request->file('userfile')->isValid()) {
                $file = $request->file('userfile');
                $extension = $file->getClientOriginalExtension();
                $newFileName = $ordine->cliente->ragione_sociale . "_" . strtoupper($ordine->PazienteCognome) . "_" . strtoupper($ordine->PazienteNome) . "_{$ordine->IDordine}_FINALE.{$extension}";

                // Salva il file nella cartella storage/app/public/uploads
                $file->storeAs('uploads', $newFileName, 'public');

                // Aggiorna l'ordine con il nome del file
                $ordine->update([
                    'file_fin' => 1,
                    'file_fin_nome' => $newFileName,
                ]);
                return redirect()->intended('/operatore/dashboard')->with(['success' => 'Lavorazione caricata con successo!']);
            }
        }catch (ValidationException $e){
            $errors = $e->validator->errors();
            return back()->withErrors($errors)->withInput();
        }
    }
}
