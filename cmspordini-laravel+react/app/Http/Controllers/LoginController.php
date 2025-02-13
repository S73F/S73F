<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    function login(Request $request)
    {
        $credentials = $request->validate([
            "username" => "required",
            "password" => "required"
        ]);

        if (Auth::guard('cliente')->attempt($credentials)) {
            $request->session()->regenerate();
            $nome = Auth::guard('cliente')->user()->nome;

            $request->session()->put('nome', $nome);

            toastify()->success('Login effettuato con successo!');
            return redirect()->intended('/clienteDashboard')->with("success", "Login effettuato con successo!");
        }

        if (Auth::guard('operatore')->attempt($credentials)) {
            $request->session()->regenerate();

            $nome = Auth::guard('operatore')->user()->nome;

            $request->session()->put('nome', $nome);

            toastify()->success('Login effettuato con successo!');
            return redirect()->intended('/operatoreDashboard')->with("success", "Login effettuato con successo!");
        }

        toastify()->error("Le credenziali fornite non sono corrette");
        return back()->with("error", "Le credenziali fornite non sono corrette")->onlyInput("username");
    }

    function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        toastify()->success("Logout effettuato con successo!");
        return redirect('/login')->with("success", "Logout effettuato con successo");
    }

    function showLoginForm()
    {
        return view("login");
    }
}
