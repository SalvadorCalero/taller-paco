<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = ['dni_nie', 'first_name', 'last_name', 'phone', 'email'];

    /**
     * RELACIÓN: Un Cliente TIENE MUCHOS Vehículos en el taller
     */
    public function vehicles()
    {
        return $this->hasMany(ClientVehicle::class);
    }
}