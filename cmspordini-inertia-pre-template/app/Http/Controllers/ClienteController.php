<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClienteController extends Controller
{
    function showDashboard()
    {
        if (Auth::guard('cliente')->check()) {
            return Inertia::render("Cliente/Dashboard");
        }
    }
}
