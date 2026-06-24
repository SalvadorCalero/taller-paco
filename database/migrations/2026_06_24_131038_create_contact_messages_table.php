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
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            
            // Relación con el vehículo en venta
            $table->foreignId('vehicle_for_sale_id')->constrained('vehicles_for_sale')->onDelete('cascade');
            
            // Datos del cliente
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->text('message');
            
            // Estado para el panel de administración
            $table->enum('status', ['Pendiente', 'Contactado', 'Descartado'])->default('Pendiente');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
