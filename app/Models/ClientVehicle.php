<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientVehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'car_model_id',
        'license_plate',
        'vin',
        'color',
        'year'
    ];

    // Relación con el Cliente (Dueño)
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    // Relación con el Modelo del Coche
    public function carModel()
    {
        return $this->belongsTo(CarModel::class);
    }

    /**
     * RELACIÓN: Un Vehículo tiene MUCHAS Órdenes de Reparación
     */
    public function repairOrders()
    {
        return $this->hasMany(RepairOrder::class);
    }
}