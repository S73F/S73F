<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Ordine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class OperatoreController extends Controller
{
    public function showDashboard()
    {
        $lavoriInCorso = Ordine::with(["cliente", "operatore"])->where("stato", '!=', 0)->orderBy('data', 'desc')->paginate(10);

        $lavoriNuovi = Ordine::with(["cliente", "operatore"])->where('stato', 0)->orderBy('data', 'desc')->get();

        return Inertia::render("Operatore/Dashboard", [
            "lavoriInCorso" => $lavoriInCorso,
            "lavoriNuovi" => $lavoriNuovi
        ]);
    }

    public function showGestioneClienti()
    {
        $clienti = Cliente::select("IDcliente", "ragione_sociale", "nome", "cognome", "emailcliente", "username")->orderBy('IDcliente', 'desc')->get();

        return Inertia::render('Operatore/GestioneClienti', ["clienti" => $clienti]);
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
                'ragione_sociale' => 'string|max:100',
                'nome' => 'string|max:50',
                'cognome' => 'string|max:50',
                'partitaIVA' => 'string|max:50',
                'indirizzo' => 'string|max:50',
                'citta' => 'string|max:50',
                'cap' => 'integer',
                'provincia' => 'string|max:50',
                'emailcliente' => 'email|string|max:50',
                'username' => 'string|max:20',
                'password' => 'string|max:100',
            ], [
                'required' => 'Il campo :attribute è obbligatorio.',
                'max' => 'Il campo :attribute non può superare i :max caratteri.',
                'email' => 'La mail inserita non è valida.',
                'integer' => 'Il campo :attribute deve contenere un numero intero.'
            ]);

            $cliente->fill(array_filter($validatedData));

            if (!empty($validatedData['password'])) {
                $cliente->password = bcrypt($validatedData['password']);
            }

            $cliente->save();

            return redirect()->intended('/operatore/gestione-clienti')->with(['success' => 'Cliente modificato con successo!']);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            return redirect()->back()->with(["error" => "Errore durante la modifica del cliente", "validation_errors" => $errors])->withErrors($errors)->withInput();
        }
    }
}
