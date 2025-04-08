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
        Schema::create('clienti', function (Blueprint $table) {
            $table->unsignedBigInteger('IDcliente')->primary(); // collegato a users.id
            $table->string('ragione_sociale')->nullable();
            $table->string('nome')->nullable();
            $table->string('cognome')->nullable();
            $table->string('partita_IVA')->nullable();
            $table->string('indirizzo')->nullable();
            $table->string('citta')->nullable();
            $table->string('cap')->nullable();
            $table->string('provincia')->nullable();
            $table->string('email')->nullable();

            // foreign key verso users.id
            $table->foreign('IDcliente')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clienti');
    }
};
