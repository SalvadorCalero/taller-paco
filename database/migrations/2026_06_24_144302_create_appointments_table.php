<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('license_plate')->nullable(); // Opcional por si es cliente nuevo
            $table->dateTime('requested_date'); // Fecha y hora que propone el cliente
            $table->string('reason'); // El desplegable: "Información", "Cita Previa", etc.
            $table->text('message')->nullable();
            // Estado de la cita en el taller
            $table->enum('status', ['Pendiente', 'Confirmada', 'Cancelada'])->default('Pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
