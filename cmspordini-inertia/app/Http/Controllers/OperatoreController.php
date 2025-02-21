<?php

namespace App\Http\Controllers;

use App\Models\Ordine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OperatoreController extends Controller
{
    function showDashboard()
    {
        if (Auth::guard('operatore')->check()) {

            $lavoriInCorso = Ordine::with(["cliente", "operatore"])->where("stato", '!=', 0)->orderBy('data', 'desc')->paginate(10);

            $lavoriNuovi = Ordine::with(["cliente", "operatore"])->where('stato', 0)->orderBy('data', 'desc')->get();

            // dd($lavoriInCorso, $lavoriNuovi);

            return Inertia::render("Operatore/Dashboard", [
                "lavoriInCorso" => $lavoriInCorso,
                "lavoriNuovi" => $lavoriNuovi
            ]);
        }
    }
}
