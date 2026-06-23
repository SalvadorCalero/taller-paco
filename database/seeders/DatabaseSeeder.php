<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use App\Models\ClientVehicle;
use App\Models\RepairOrder;

class DatabaseSeeder extends Seeder
{
    /**
     * El método run se ejecuta cuando lanzamos el comando db:seed
     */
    public function run(): void
    {
        // 1. Ejecutamos el catálogo estático primero (Marcas, Modelos y Vehículos en Venta)
        // Es importante hacerlo primero para que los coches de los clientes tengan modelos donde asignarse.
        $this->call([
            CatalogSeeder::class,
        ]);

        // 2. Magia de Factorías (Generamos los datos del Taller)
        // Vamos a crear 50 clientes.
        // A cada cliente le asignamos entre 1 y 2 vehículos.
        // A cada vehículo le asignamos entre 1 y 3 órdenes de reparación (su historial).
        Client::factory(50)
            ->has(
                ClientVehicle::factory()
                    ->count(rand(1, 2))
                    ->has(
                        RepairOrder::factory()->count(rand(1, 3)), 
                        'repairOrders' // Nombre de la relación en el modelo
                    ),
                'vehicles' // Nombre de la relación en el modelo
            )
            ->create();
    }
}