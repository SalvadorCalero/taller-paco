<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_vehicle_id',
        'entry_date',
        'exit_date',
        'initial_diagnosis',
        'department',
        'work_performed',
        'status'
    ];

    /**
     * CASTS: Conversiones automáticas de tipos de datos.
     * Como guardamos 'department' en formato JSON en la base de datos, 
     * le decimos a Laravel que lo convierta automáticamente en un Array de PHP al consultarlo.
     * También aseguramos que las fechas se traten como objetos Carbon (fechas de Laravel).
     */
    protected $casts = [
        'department' => 'array', // Convierte el JSON de MySQL a un Array de PHP/React
        'entry_date' => 'datetime',
        'exit_date' => 'datetime',
    ];

    /**
     * RELACIÓN: Esta orden de reparación PERTENECE A un Vehículo de Cliente
     */
    public function clientVehicle()
    {
        return $this->belongsTo(ClientVehicle::class);
    }
}
