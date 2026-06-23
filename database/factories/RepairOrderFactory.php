<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RepairOrderFactory extends Factory
{
    public function definition(): array
    {
        // Define departamentos disponibles
        $departments = ['Chapa y Pintura', 'Electrónica', 'Aire Acondicionado', 'Tapicería'];
        
        // Elige aleatoriamente 1 o 2 departamentos
        $selectedDepartments = $this->faker->randomElements($departments, $this->faker->numberBetween(1, 2));

        // Fechas y estado
        $entryDate = $this->faker->dateTimeBetween('-6 months', 'now');
        $isFinished = $this->faker->boolean(70);

        // Frases realistas para el diagnóstico inicial
        $diagnostics = [
            'El cliente indica que el vehículo presenta ruidos metálicos al frenar.',
            'Pérdida de potencia notable en subidas y tirones en 3ª marcha.',
            'Testigo de fallo motor (Check Engine) encendido fijo en el cuadro de instrumentos.',
            'El aire acondicionado no enfría lo suficiente, sale aire a temperatura ambiente.',
            'Rozadura profunda en la aleta delantera derecha y paragolpes tras un roce.',
            'Fallo intermitente en el elevalunas del lado del conductor.',
            'Fuerte vibración en el volante al superar los 100 km/h.',
            'El asiento del copiloto tiene la tapicería descosida en el lateral izquierdo.',
            'Revisión general pre-ITV y cambio de aceite y filtros.'
        ];

        // Frases realistas para el trabajo realizado
        $works = [
            'Sustitución del juego de pastillas y discos de freno delanteros. Purgado del líquido de frenos.',
            'Limpieza por ultrasonidos de la válvula EGR y regeneración forzada del filtro de partículas.',
            'Lectura de errores con máquina de diagnosis. Sustitución de sonda lambda y borrado de fallos.',
            'Búsqueda de fugas con nitrógeno. Reparación de poro en el condensador y recarga de gas refrigerante.',
            'Lijado, aplicación de masilla, imprimación y pintura en cabina de la aleta y paragolpes.',
            'Desmontaje del panel de la puerta y sustitución del motor del elevalunas.',
            'Sustitución de dos neumáticos delanteros, equilibrado y alineación de la dirección.',
            'Desmontaje del asiento, sustitución del panel de tela dañado y grapado de la nueva tapicería.',
            'Cambio de aceite 5W30, filtro de aceite, filtro de aire y filtro del habitáculo.'
        ];

        return [
            'entry_date' => $entryDate,
            'exit_date' => $isFinished ? (clone $entryDate)->modify('+' . rand(1, 10) . ' days') : null,
            // Selecciona una frase aleatoria de nuestros arrays en español
            'initial_diagnosis' => $this->faker->randomElement($diagnostics),
            'department' => $selectedDepartments,
            'work_performed' => $isFinished ? $this->faker->randomElement($works) : null,
            'status' => $isFinished ? 'Entregado' : $this->faker->randomElement(['Pendiente', 'En Proceso', 'Listo para Entrega']),
        ];
    }
}