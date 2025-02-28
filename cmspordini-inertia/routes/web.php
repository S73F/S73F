<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OperatoreController;
use App\Http\Controllers\OrdineController;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['middleware' => RedirectIfAuthenticated::class], function () {
    Route::get('/', function () {
        return redirect()->intended("/login");
    });
    // Route per il login
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
});

Route::post("/login", [LoginController::class, "login"])->name('loginUser');
Route::post("/logout", [LoginController::class, "logout"])->name('logoutUser');

Route::group(['middleware' => "auth:cliente"], function () {
    Route::get("/cliente/dashboard", [ClienteController::class, "showDashboard"])->name("clienteDashboard");
    Route::get("/cliente/ordini/creazione", [OrdineController::class, "showCreazione"])->name("paginaCreazioneOrdine");
    Route::post('/cliente/ordini/creazione', [OrdineController::class, 'creazione'])->name('creazioneOrdine');
    Route::get("/cliente/ordini/storico", [OrdineController::class, "showStorico"])->name("paginaStoricoOrdini");
    Route::get("/cliente/ordini/storico/{tempo}", [OrdineController::class, "getStorico"])->name("tabellaStoricoOrdini");
    Route::get('/cliente/ordini/{id}', [OrdineController::class, 'generaPDF'])->name('clienteGeneraPDF');
});

Route::group(['middleware' => "auth:operatore"], function () {
    Route::get("/operatore/dashboard", [OperatoreController::class, "showDashboard"])->name("operatoreDashboard");
    Route::get('/operatore/lavori', [OrdineController::class, 'getLavori'])->name('getLavori');
    Route::get('/operatore/gestione-clienti', [OperatoreController::class, 'showGestioneClienti'])->name('showGestioneClienti');
    Route::get('/operatore/gestione-clienti/creazione', [OperatoreController::class, 'showCreateClienteModal'])->name('showCreateClienteModal');
    Route::post('/operatore/gestione-clienti/creazione', [OperatoreController::class, 'createCliente'])->name('createCliente');
    Route::get('/operatore/gestione-clienti/modifica/{id}', [OperatoreController::class, 'showModificaClienteModal'])->name('showModificaClienteModal');
    Route::patch('/operatore/gestione-clienti/modifica/{id}', [OperatoreController::class, 'patchCliente'])->name('patchCliente');
    Route::delete('/operatore/gestione-clienti/cancellazione/{id}', [OperatoreController::class, 'deleteCliente'])->name('deleteCliente');
    Route::get('/operatore/ordini-clienti', [OperatoreController::class, 'showOrdiniClienti'])->name('showOrdiniClienti');
    Route::get('/operatore/ordini-clienti/{id}', [OperatoreController::class, 'showOrdiniCliente'])->name('showOrdiniCliente');
    Route::get('/operatore/ordini-clienti/pdf/{id}', [OrdineController::class, 'generaPDF'])->name('operatoreGeneraPDF');
    Route::patch('/operatore/ordini-clienti/update/{id}', [OrdineController::class, 'aggiornaStato'])->name('aggiornaStato');
    Route::get('/operatore/ordini-clienti/download/{id}', [OrdineController::class, 'downloadFile'])->name('downloadFile');
    Route::get('/operatore/ordini-clienti/caricamento-lavorazione/{id}', [OperatoreController::class, 'showLavorazioneModal'])->name('showLavorazioneModal');
    Route::post('/operatore/ordini-clienti/caricamento-lavorazione/{id}', [OperatoreController::class, 'caricaLavorazione'])->name('caricaLavorazione');
});
