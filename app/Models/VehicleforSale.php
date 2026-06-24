<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleForSale extends Model
{
    use HasFactory;

    // Le decimos a Laravel explícitamente el nombre de la tabla para evitar su pluralización por defecto
    protected $table = 'vehicles_for_sale';

    protected $fillable = [
        'car_model_id', 'condition', 'price', 'year', 
        'mileage', 'fuel_type', 'description', 'status',
        'image_path'
    ];

    /**
     * RELACIÓN: Este vehículo en venta PERTENECE A un modelo concreto
     */
    public function carModel()
    {
        return $this->belongsTo(CarModel::class);
    }
}