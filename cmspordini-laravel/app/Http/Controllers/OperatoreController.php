<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OperatoreController extends Controller
{
    function showDashboard()
    {
        if (Auth::guard('operatore')->check()) {
            return view("operatore/dashboard");
        }
    }
}
