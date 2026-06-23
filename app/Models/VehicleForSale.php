<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleForSale extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_model_id', 'condition', 'price', 'year', 
        'mileage', 'fuel_type', 'description', 'status'
    ];

    /**
     * RELACIÓN: Este vehículo en venta PERTENECE A un modelo concreto
     */
    public function carModel()
    {
        return $this->belongsTo(CarModel::class);
    }
}