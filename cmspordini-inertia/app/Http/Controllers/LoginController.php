<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render("Auth/Login");
    }

    function login(Request $request)
    {
        $credentials = $request->validate([
            "username" => "required",
            "password" => "required"
        ]);

        if (!Auth::guard("cliente")->check() && !Auth::guard("operatore")->check()) {
            if (Auth::guard('cliente')->attempt($credentials)) {
                $request->session()->regenerate();

                return redirect()->intended('/cliente/dashboard')->with(["success" => "Login effettuato con successo!"]);
            }

            if (Auth::guard('operatore')->attempt($credentials)) {
                $request->session()->regenerate();

                return redirect()->intended('/operatore/dashboard')->with(["success" => "Login effettuato con successo!"]);
            }

            return back()->with(["error" => "Le credenziali fornite non sono corrette"])->onlyInput("username");
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
