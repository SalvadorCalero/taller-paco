<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    public function definition(): array
    {
        return [
            // Genera un DNI simulado: 8 números y 1 letra mayúscula
            'dni_nie' => $this->faker->unique()->regexify('[0-9]{8}[A-Z]'),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName() . ' ' . $this->faker->lastName(),
            // Número de teléfono con formato español básico
            'phone' => $this->faker->numerify('6########'),
            'email' => $this->faker->unique()->safeEmail(),
        ];
    }
}