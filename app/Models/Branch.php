<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    // Campos que permitimos rellenar masivamente (Mass Assignment)
    protected $fillable = ['name'];

    /**
     * RELACIÓN: Una Marca (Brand) TIENE MUCHOS Modelos (CarModel)
     * Tipo: Uno a Muchos (1:N)
     */
    public function carModels()
    {
        return $this->hasMany(CarModel::class);
    }
}