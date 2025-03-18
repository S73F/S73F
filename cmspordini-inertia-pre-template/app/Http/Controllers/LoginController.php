<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render("Auth/Login");
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                "username" => "required",
                "password" => "required"
            ], [
                'required' => 'Il campo :attribute è obbligatorio.',
            ]);

            foreach (['cliente', 'operatore'] as $guard) {
                if (Auth::guard($guard)->attempt($credentials)) {
                    $request->session()->regenerate();
                    return redirect()->intended("/$guard/dashboard")->with("success", "Login effettuato con successo!");
                }
            }

            throw new Exception("Login non riuscito");

        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            return redirect()->back()->with(["validation_errors" => $errors])->withInput();
        } catch (Exception $e) {
            return back()->with("error", "Le credenziali fornite non sono corrette")->onlyInput("username");
        }
    }

    function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')->with("success", "Logout effettuato con successo");
    }
}
