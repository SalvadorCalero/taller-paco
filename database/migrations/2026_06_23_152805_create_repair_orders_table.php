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
    Schema::create('repair_orders', function (Blueprint $table) {
        $table->id();
        $table->foreignId('client_vehicle_id')->constrained()->cascadeOnDelete();
        $table->dateTime('entry_date');
        $table->dateTime('exit_date')->nullable();
        $table->text('initial_diagnosis');
        // Usamos JSON porque un coche puede entrar a varios departamentos a la vez
        $table->json('department'); 
        $table->text('work_performed')->nullable();
        $table->enum('status', ['Pendiente', 'En Proceso', 'Listo para Entrega', 'Entregado'])->default('Pendiente');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repair_orders');
    }
};
