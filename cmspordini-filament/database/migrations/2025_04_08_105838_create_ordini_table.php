<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ordini', function (Blueprint $table) {
            $table->bigIncrements('IDordine');
            $table->unsignedBigInteger('IDcliente');
            $table->unsignedBigInteger('IDoperatore')->nullable();
            $table->string('numero')->nullable();
            $table->date('data')->nullable();
            $table->string('medico_ordinante')->nullable();
            $table->string('nome_paziente')->nullable();
            $table->string('cognome_paziente')->nullable();
            $table->string('indirizzo_spedizione')->nullable();
            $table->boolean('file_ok')->default(false);
            $table->date('data_inizio_lavorazione')->nullable();
            $table->string('stato')->nullable();
            $table->date('data_spedizione')->nullable();
            $table->text('note')->nullable();
            $table->string('nome_file')->nullable();
            $table->string('lavorazione')->nullable();
            $table->string('colore')->nullable();
            $table->string('piattaforma')->nullable();
            $table->date('data_consegna')->nullable();
            $table->time('ora_consegna')->nullable();
            $table->text('note_interne')->nullable();
            $table->text('note_ultima_modifica')->nullable();
            $table->string('utente_modifica')->nullable();
            $table->string('file_finale')->nullable();
            $table->string('nome_file_finale')->nullable();

            // foreign keys
            $table->foreign('IDcliente')->references('IDcliente')->on('clienti')->onDelete('cascade');
            $table->foreign('IDoperatore')->references('IDoperatore')->on('operatori')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ordini');
    }
};
