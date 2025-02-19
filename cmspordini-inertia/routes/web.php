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
});

Route::group(['middleware' => "auth:operatore"], function () {
    Route::get("/operatore/dashboard", [OperatoreController::class, "showDashboard"])->name("operatoreDashboard");
});
