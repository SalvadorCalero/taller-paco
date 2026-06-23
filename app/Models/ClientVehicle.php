<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientVehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id', 'car_model_id', 'license_plate', 'vin', 'color', 'year'
    ];

    /**
     * RELACIÓN: El vehículo PERTENECE A un Cliente
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * RELACIÓN: El vehículo PERTENECE A un Modelo del catálogo
     */
    public function carModel()
    {
        return $this->belongsTo(CarModel::class);
    }

    /**
     * RELACIÓN: Un vehículo del cliente puede tener MUCHAS órdenes de reparación (historial)
     */
    public function repairOrders()
    {
        return $this->hasMany(RepairOrder::class);
    }
}