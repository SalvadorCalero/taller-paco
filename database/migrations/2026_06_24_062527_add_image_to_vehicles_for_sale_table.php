<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('vehicles_for_sale', function (Blueprint $table) {
            // Añadimos la columna para guardar la ruta de la imagen. 
            // Puede ser nula por si damos de alta un coche sin foto al principio.
            $table->string('image_path')->nullable()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('vehicles_for_sale', function (Blueprint $table) {
            // Si revertimos la migración, eliminamos la columna
            $table->dropColumn('image_path');
        });
    }
};