<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class ClienteController extends Controller
{
    function showDashboard()
    {
        if (Auth::guard('cliente')->check()) {
            return view("cliente/dashboard");
        }
    }
}
