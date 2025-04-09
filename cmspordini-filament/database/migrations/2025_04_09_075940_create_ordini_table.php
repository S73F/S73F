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
            $table->id('idOrdine')->primary();
            $table->foreignId('idCliente')->constrained('clienti')->onDelete('cascade');
            $table->foreignId('idOperatore')->nullable()->constrained('operatori')->onDelete('cascade');
            $table->bigInteger('numeroAnnuo');
            $table->string('medicoOrdinante', 50);
            $table->string('nomePaziente', 50);
            $table->string('cognomePaziente', 50);
            $table->string('indirizzoSpedizione', 50);
            $table->tinyInteger('fileOk')->nullable()->default(0); // 0 = non presente, 1 = presente;
            $table->tinyInteger('stato')->default(0); // 0 = in attesa, 1 = in lavorazione, 2 = completato
            $table->dateTime('inizioLavorazione')->nullable();
            $table->dateTime('spedizione')->nullable();
            $table->text('note');
            $table->string('nomeFile', 100)->nullable();
            $table->string('lavorazione', 1000);
            $table->string('colore', 100);
            $table->text('piattaforma');
            $table->date('dataConsegna');
            $table->time('oraConsegna');
            $table->text('noteInterne');
            $table->string('utenteModifica', 150);
            $table->tinyInteger('fileFinale')->default(0); // 0 = non presente, 1 = presente
            $table->string('nomeFileFinale', 150)->nullable();
            $table->timestamps();
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
