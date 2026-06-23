<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CarModel;

class ClientVehicleFactory extends Factory
{
    public function definition(): array
    {
        return [
            // Asigna un modelo aleatorio de los que ya existan en la base de datos
            'car_model_id' => CarModel::inRandomOrder()->first()->id,
            // Genera matrícula española moderna: 4 números y 3 letras
            'license_plate' => $this->faker->unique()->regexify('[0-9]{4}[A-Z]{3}'),
            // Genera un número de bastidor (VIN) aleatorio de 17 caracteres
            'vin' => $this->faker->unique()->regexify('[A-Z0-9]{17}'),
            'color' => $this->faker->safeColorName(),
            // Año de fabricación entre 2005 y el año actual
            'year' => $this->faker->numberBetween(2005, date('Y')),
        ];
    }
}