<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    // Damos permiso explícito para guardar estos campos masivamente
    protected $fillable = [
        'dni_nie',
        'first_name',
        'last_name',
        'phone',
        'email'
    ];

    /**
     * RELACIÓN: Un Cliente TIENE MUCHOS Vehículos en el taller
     * (El nombre clientVehicles es el que espera nuestro controlador y React)
     */
    public function clientVehicles()
    {
        return $this->hasMany(ClientVehicle::class);
    }
}