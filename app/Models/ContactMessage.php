<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    // Permitimos que estos campos se llenen de forma masiva desde el formulario
    protected $fillable = [
        'vehicle_for_sale_id', 
        'name', 
        'email', 
        'phone', 
        'message', 
        'status'
    ];

    /**
     * RELACIÓN: Un mensaje de contacto pertenece a un Vehículo en venta
     */
    public function vehicle()
    {
        return $this->belongsTo(VehicleforSale::class, 'vehicle_for_sale_id');
    }
}