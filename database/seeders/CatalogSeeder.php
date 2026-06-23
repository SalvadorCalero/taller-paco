<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;
use App\Models\CarModel;
use App\Models\VehicleForSale;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Estructura de 5 Marcas con 3 Modelos (Coches Nuevos)
        $newBrands = [
            'Toyota' => ['Corolla', 'Yaris', 'RAV4'],
            'Kia' => ['Sportage', 'Ceed', 'Niro'],
            'Hyundai' => ['Tucson', 'i30', 'Kona'],
            'Seat' => ['Ibiza', 'Leon', 'Ateca'],
            'Peugeot' => ['208', '3008', '2008'],
        ];

        // Iteramos para guardar en la base de datos
        foreach ($newBrands as $brandName => $models) {
            $brand = Brand::create(['name' => $brandName]); // Crea la marca
            
            foreach ($models as $modelName) {
                // Crea el modelo asociado a la marca
                $carModel = CarModel::create(['brand_id' => $brand->id, 'name' => $modelName]);
                
                // Crea el coche físico en el catálogo de ventas
                VehicleForSale::create([
                    'car_model_id' => $carModel->id,
                    'condition' => 'Nuevo',
                    'price' => rand(20000, 35000), // Precio aleatorio
                    'year' => date('Y'), // Año actual para coches nuevos
                    'mileage' => 0, // 0 km
                    'fuel_type' => collect(['Gasolina', 'Híbrido', 'Eléctrico'])->random(),
                    'description' => 'Vehículo a estrenar con garantía oficial de TallerPaco.',
                    'status' => 'Disponible',
                ]);
            }
        }

        // 2. Estructura de 5 Marcas con 3 Modelos (Coches de Segunda Mano)
        $usedBrands = [
            'BMW' => ['Serie 1', 'Serie 3', 'X1'],
            'Audi' => ['A3', 'A4', 'Q3'],
            'Mercedes-Benz' => ['Clase A', 'Clase C', 'GLA'],
            'Ford' => ['Focus', 'Fiesta', 'Kuga'],
            'Renault' => ['Clio', 'Megane', 'Captur'],
        ];

        foreach ($usedBrands as $brandName => $models) {
            $brand = Brand::create(['name' => $brandName]);
            
            foreach ($models as $modelName) {
                $carModel = CarModel::create(['brand_id' => $brand->id, 'name' => $modelName]);
                
                VehicleForSale::create([
                    'car_model_id' => $carModel->id,
                    'condition' => 'SegundaMano',
                    'price' => rand(5000, 18000),
                    'year' => rand(2010, 2021), // Años anteriores
                    'mileage' => rand(40000, 200000), // Kilometraje simulado
                    'fuel_type' => collect(['Gasolina', 'Diésel'])->random(),
                    'description' => 'Vehículo revisado y certificado por nuestros mecánicos.',
                    'status' => 'Disponible',
                ]);
            }
        }
    }
}