<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OperatoreController;
use App\Http\Controllers\OrdineController;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Support\Facades\Route;


Route::group(['middleware' => RedirectIfAuthenticated::class], function () {
    Route::get('/', function () {
        return redirect()->route('login');
    });
    // Route per il login
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post("/login", [LoginController::class, "login"])->name('loginUser');
});

Route::group(['middleware' => 'auth:cliente'], function () {
    Route::get('/clienteDashboard', [ClienteController::class, "showDashboard"])->name("showClienteDashboard");
    Route::get('/clienteDashboard/ordini/creazione', [OrdineController::class, 'showCreazione'])->name('showCreazione');
    Route::post('/clienteDashboard/ordini/creazione', [OrdineController::class, 'creazione'])->name('creazioneOrdine');
    Route::get('/clienteDashboard/ordini/storico', [OrdineController::class, 'showStorico'])->name('storicoOrdini');
    Route::get('/clienteDashboard/ordini/storico/tempo', [OrdineController::class, 'getStorico'])->name('storicoOrdiniTempo');
    Route::get('/clienteDashboard/ordini/{id}', [OrdineController::class, 'generaPDF'])->name('generaPDF');
});

Route::group(['middleware' => 'auth:operatore'], function () {
    Route::get('/operatoreDashboard', [OperatoreController::class, "showDashboard"])->name("showOperatoreDashboard");
    Route::get('/operatoreDashboard/lavori', [OrdineController::class, 'getLavori'])->name('getLavori');
});

// Route per il logout
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
