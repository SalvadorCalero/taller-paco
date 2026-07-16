<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\ClientVehicle;
use App\Models\Client;
use App\Models\CarModel; // Importante: Añadimos el modelo de los coches
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientVehicleController extends Controller
{
    public function index(Request $request)
{
    $query = ClientVehicle::with(['client', 'carModel.brand']);

    $query->when($request->license_plate, fn($q, $v) => $q->where('license_plate', 'like', "%{$v}%"))
          ->when($request->vin, fn($q, $v) => $q->where('vin', 'like', "%{$v}%"))
          ->when($request->color, fn($q, $v) => $q->where('color', 'like', "%{$v}%"))
          ->when($request->model_name, function($q, $v) {
              $q->whereHas('carModel', fn($query) => $query->where('name', 'like', "%{$v}%"));
          })
          ->when($request->client_name, function($q, $v) {
              $q->whereHas('client', fn($query) => 
                  $query->where('first_name', 'like', "%{$v}%")->orWhere('last_name', 'like', "%{$v}%")
              );
          });

    return Inertia::render('BackOffice/ClientVehicles/Index', [
        'vehicles' => $query->latest()->paginate(10)->withQueryString(),
        'filters' => $request->only(['license_plate', 'vin', 'client_name', 'model_name', 'color'])
    ]);
}

    public function create(Request $request)
    {
        // Traemos clientes y modelos de coches para los desplegables (<select>)
        $clients = Client::select('id', 'first_name', 'last_name', 'dni_nie')->get();
        $carModels = CarModel::with('brand')->get();

        $preselectedClientId = $request->query('client_id', '');

        return Inertia::render('BackOffice/ClientVehicles/Create', [
            'clients' => $clients,
            'carModels' => $carModels,
            'preselectedClientId' => $preselectedClientId
        ]);
    }

    public function store(Request $request)
    {
        // Validación con los nombres exactos de tu base de datos
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'car_model_id' => 'required|exists:car_models,id',
            'license_plate' => 'required|string|max:20|unique:client_vehicles,license_plate',
            'vin' => 'required|string|max:50|unique:client_vehicles,vin',
            'color' => 'required|string|max:50',
            'year' => 'required|integer|min:1950|max:' . (date('Y') + 1),
        ], [
            'license_plate.unique' => 'Esta matrícula ya está registrada en el taller.',
            'vin.unique' => 'Este número de bastidor (VIN) ya existe en el sistema.',
        ]);

        ClientVehicle::create($validated);

        return redirect()->route('admin.client-vehicles.index');
    }

    /**
     * Muestra el formulario para editar un vehículo del taller.
     */
    public function edit(string $id)
    {
        $vehicle = ClientVehicle::findOrFail($id);

        // Necesitamos las listas para los desplegables igual que en la creación
        $clients = Client::select('id', 'first_name', 'last_name', 'dni_nie')->get();
        $carModels = CarModel::with('brand')->get();

        return Inertia::render('BackOffice/ClientVehicles/Edit', [
            'vehicle' => $vehicle,
            'clients' => $clients,
            'carModels' => $carModels
        ]);
    }

    /**
     * Valida y actualiza los datos del vehículo.
     */
    public function update(Request $request, string $id)
    {
        $vehicle = ClientVehicle::findOrFail($id);

        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'car_model_id' => 'required|exists:car_models,id',
            // Ignoramos el ID de este vehículo para la comprobación de matrícula única
            'license_plate' => 'required|string|max:20|unique:client_vehicles,license_plate,' . $vehicle->id,
            // Hacemos lo mismo para el número de bastidor
            'vin' => 'required|string|max:50|unique:client_vehicles,vin,' . $vehicle->id,
            'color' => 'required|string|max:50',
            'year' => 'required|integer|min:1950|max:' . (date('Y') + 1),
        ], [
            'license_plate.unique' => 'Esta matrícula ya está registrada en otro vehículo del taller.',
            'vin.unique' => 'Este número de bastidor (VIN) ya existe en otro vehículo del sistema.',
        ]);

        $vehicle->update($validated);

        return redirect()->route('admin.client-vehicles.index');
    }

    /**
     * Elimina el vehículo del sistema.
     */
    public function destroy(string $id)
    {
        $vehicle = ClientVehicle::findOrFail($id);
        $vehicle->delete();

        return redirect()->route('admin.client-vehicles.index');
    }
}
