<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class LoginController extends Controller
{
    /**
     * Mostra il modulo di login.
     *
     * @return \Inertia\Response
     */
    public function showLoginForm()
    {
        return Inertia::render("Auth/Login");
    }

    /**
     * Gestisce la richiesta di login dell'utente.
     *
     * @param Request $request - La richiesta HTTP contenente le credenziali di login.
     * @return \Illuminate\Http\RedirectResponse - Redirect alla dashboard se il login ha successo, altrimenti torna alla pagina di login con un messaggio di errore.
     */
    public function login(Request $request)
    {
        try {
            // Validazione delle credenziali
            $credentials = $request->validate([
                "username" => "required",
                "password" => "required"
            ], [
                'required' => 'Il campo :attribute è obbligatorio.',
            ]);

            // Prova ad autenticare l'utente con le guardie "cliente" e "operatore"
            foreach (['cliente', 'operatore'] as $guard) {
                if (Auth::guard($guard)->attempt($credentials)) {
                    $request->session()->regenerate();
                    return redirect()->intended("/$guard/dashboard")->with("success", "Login effettuato con successo!");
                }
            }

            // Se l'autenticazione fallisce, lancia un'eccezione
            throw new Exception("Credenziali non valide");

        } catch (ValidationException $e) {
            // Gestisce errori di validazione e li restituisce alla pagina di login
            $errors = $e->validator->errors();
            return redirect()->back()->with(["validation_errors" => $errors])->withInput();
        } catch (Exception $e) {
            // Gestisce errori generici di autenticazione
            return back()->with("error", "Le credenziali fornite non sono corrette")->onlyInput("username");
        }
    }

    /**
     * Gestisce il logout dell'utente.
     *
     * @param Request $request - La richiesta HTTP.
     * @return \Illuminate\Http\RedirectResponse - Redirect alla pagina di login con un messaggio di successo.
     */
    public function logout(Request $request)
    {
        Auth()->logout(); // Effettua il logout dell'utente

        // Invalida la sessione e rigenera il token CSRF per sicurezza
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login')->with("success", "Logout effettuato con successo");
    }
}
