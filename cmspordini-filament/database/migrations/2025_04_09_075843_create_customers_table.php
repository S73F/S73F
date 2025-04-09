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
        Schema::create('customers', function (Blueprint $table) {
            $table->id('idCliente')->primary();
            $table->foreignId('id')->constrained('users')->onDelete('cascade'); // Foreign key to the users table
            $table->string('ragioneSociale', 100);
            $table->string('nome', 50)->nullable();
            $table->string('cognome', 50)->nullable();
            $table->string('partitaIva', 50);
            $table->string('indirizzo', 50);
            $table->string('citta', 50);
            $table->integer('cap');
            $table->string('provincia', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
