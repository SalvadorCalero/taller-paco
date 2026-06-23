<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarModel extends Model
{
    use HasFactory;

    protected $fillable = ['brand_id', 'name'];

    /**
     * RELACIÓN: Un Modelo (CarModel) PERTENECE A una Marca (Brand)
     * Tipo: Inversa de Uno a Muchos
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * RELACIÓN: Un Modelo puede estar en MUCHOS Vehículos en Venta
     */
    public function vehiclesForSale()
    {
        return $this->hasMany(VehicleForSale::class);
    }

    /**
     * RELACIÓN: Un Modelo puede ser el de MUCHOS Vehículos de Clientes (Taller)
     */
    public function clientVehicles()
    {
        return $this->hasMany(ClientVehicle::class);
    }
}