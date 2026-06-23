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
    Schema::create('vehicles_for_sale', function (Blueprint $table) {
        $table->id();
        $table->foreignId('car_model_id')->constrained()->cascadeOnDelete();
        $table->enum('condition', ['Nuevo', 'SegundaMano']);
        $table->decimal('price', 10, 2);
        $table->integer('year');
        $table->integer('mileage')->default(0);
        $table->enum('fuel_type', ['Gasolina', 'Diésel', 'Híbrido', 'Eléctrico']);
        $table->text('description')->nullable();
        $table->enum('status', ['Disponible', 'Reservado', 'Vendido'])->default('Disponible');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_for_sales');
    }
};
