<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OperatoreController extends Controller
{
    function showDashboard()
    {
        if (Auth::guard('operatore')->check()) {
            return Inertia::render("Operatore/Dashboard");
        }
    }
}
