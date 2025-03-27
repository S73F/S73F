<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\OperatoreController;
use App\Http\Controllers\OrdineController;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Support\Facades\Route;

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
    Route::get("/cliente/ordini/storico/{tempo?}", [OrdineController::class, "getStorico"])->name("tabellaStoricoOrdini");
    Route::get('/cliente/ordini/pdf/{id}', [OrdineController::class, 'generaPDF'])->name('clienteGeneraPDF');
    Route::get('/cliente/ordini/download/{id}', [OrdineController::class, 'downloadFile'])->name('downloadFileCliente');
    Route::get('/cliente/ordini/download-finale/{id}', [OrdineController::class, 'downloadFileFinale'])->name('downloadFileFinaleCliente');
});

Route::group(['middleware' => "auth:operatore"], function () {
    Route::get("/operatore/dashboard", [OperatoreController::class, "showDashboard"])->name("operatoreDashboard");
    Route::get('/operatore/lavori/contatore-nuovi', [OrdineController::class, 'getNumeroLavori'])->name('getNumeroLavori');
    Route::get('/operatore/lavori/eliminazione/{id}', [OperatoreController::class, 'showEliminazioneOrdineModal'])->name('showEliminazioneOrdineModal');
    Route::delete('/operatore/lavori/eliminazione/{id}', [OperatoreController::class, 'deleteOrdine'])->name('deleteOrdine');
    Route::get('/operatore/lavori/{tipo}', [OperatoreController::class, 'showLavori'])->name('showLavori');
    Route::get('/operatore/utente', [OperatoreController::class, 'getAuthenticatedUser'])->name('getAuthenticatedUser');
    Route::get('/operatore/gestione-clienti', [OperatoreController::class, 'showGestioneClienti'])->name('showGestioneClienti');
    Route::get('/operatore/gestione-clienti/creazione', [OperatoreController::class, 'showCreateClienteModal'])->name('showCreateClienteModal');
    Route::post('/operatore/gestione-clienti/creazione', [OperatoreController::class, 'createCliente'])->name('createCliente');
    Route::get('/operatore/gestione-clienti/modifica/{id}', [OperatoreController::class, 'showModificaClienteModal'])->name('showModificaClienteModal');
    Route::patch('/operatore/gestione-clienti/modifica/{id}', [OperatoreController::class, 'patchCliente'])->name('patchCliente');
    Route::get('/operatore/gestione-clienti/eliminazione/{id}', [OperatoreController::class, 'showEliminazioneClienteModal'])->name('showEliminazioneClienteModal');
    Route::delete('/operatore/gestione-clienti/eliminazione/{id}', [OperatoreController::class, 'deleteCliente'])->name('deleteCliente');
    Route::get('/operatore/ordini-clienti/{id?}', [OperatoreController::class, 'showOrdiniCliente'])->name('tabellaOrdiniCliente');
    Route::get('/operatore/ordini-clienti/pdf/{id}', [OrdineController::class, 'generaPDF'])->name('operatoreGeneraPDF');
    Route::patch('/operatore/ordini-clienti/update/{id}/{option}', [OrdineController::class, 'aggiornaStato'])->name('aggiornaStato');
    Route::get('/operatore/ordini-clienti/download/{id}', [OrdineController::class, 'downloadFile'])->name('downloadFileOperatore');
    Route::get('/operatore/ordini-clienti/download-finale/{id}', [OrdineController::class, 'downloadFileFinale'])->name('downloadFileFinaleOperatore');
    Route::get('/operatore/ordini-clienti/caricamento-lavorazione/{id}', [OperatoreController::class, 'showLavorazioneModal'])->name('showLavorazioneModal');
    Route::post('/operatore/ordini-clienti/caricamento-lavorazione/{id}', [OperatoreController::class, 'caricaLavorazione'])->name('caricaLavorazione');
});
