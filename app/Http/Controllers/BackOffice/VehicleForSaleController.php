<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\VehicleforSale;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CarModel;
use Illuminate\Support\Facades\Storage;

class VehicleforSaleController extends Controller
{
    /**
     * Muestra el listado principal del inventario
     */
    public function index()
    {
        // Traemos los vehículos paginados de 10 en 10, incluyendo la relación con el modelo y su marca
        $vehicles = VehicleforSale::with('carModel.brand')->latest()->paginate(10);

        // Renderizamos el componente de React y le pasamos los datos
        return Inertia::render('BackOffice/VehiclesForSale/Index', [
            'vehicles' => $vehicles
        ]);
    }

    /**
     * Muestra el formulario para crear un nuevo vehículo.
     */
    public function create()
    {
        // Necesitamos pasar todos los modelos (y sus marcas) a la vista 
        // para rellenar el campo <select> del formulario.
        $carModels = CarModel::with('brand')->get();

        return Inertia::render('BackOffice/VehiclesForSale/Create', [
            'carModels' => $carModels
        ]);
    }

    /**
     * Recibe los datos del formulario, los valida y guarda el vehículo en la BD.
     */
    public function store(Request $request)
    {
        // 1. Validamos los datos, añadiendo la validación de la imagen
        $validated = $request->validate([
            'car_model_id' => 'required|exists:car_models,id',
            'condition' => 'required|in:Nuevo,SegundaMano',
            'price' => 'required|numeric|min:0',
            'year' => 'required|integer|min:1950|max:' . (date('Y') + 1),
            'mileage' => 'required|integer|min:0',
            'fuel_type' => 'required|in:Gasolina,Diésel,Híbrido,Eléctrico',
            'description' => 'nullable|string',
            'status' => 'required|in:Disponible,Reservado,Vendido',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // Max 2MB, formatos web
        ]);

        // 2. Comprobamos si el usuario ha subido una imagen
        if ($request->hasFile('image')) {
            // Guardamos la imagen en storage/app/public/vehicles
            // y guardamos la ruta resultante en el array de datos validados
            $validated['image_path'] = $request->file('image')->store('vehicles', 'public');
        }

        // 3. Insertamos el nuevo registro en la base de datos
        VehicleforSale::create($validated);

        // 4. Redirigimos al índice
        return redirect()->route('admin.vehicles-for-sale.index');
    }



    /**
     * Muestra el formulario para editar un vehículo existente.
     */
    public function edit(string $id)
    {
        // Buscamos el coche o fallamos devolviendo un error 404
        $vehicle = VehicleforSale::findOrFail($id);
        $carModels = CarModel::with('brand')->get();

        return Inertia::render('BackOffice/VehiclesForSale/Edit', [
            'vehicle' => $vehicle,
            'carModels' => $carModels
        ]);
    }

    /**
     * Valida y actualiza los datos del vehículo en la BD.
     */
    public function update(Request $request, string $id)
    {
        $vehicle = VehicleforSale::findOrFail($id);

        $validated = $request->validate([
            'car_model_id' => 'required|exists:car_models,id',
            'condition' => 'required|in:Nuevo,SegundaMano',
            'price' => 'required|numeric|min:0',
            'year' => 'required|integer|min:1950|max:' . (date('Y') + 1),
            'mileage' => 'required|integer|min:0',
            'fuel_type' => 'required|in:Gasolina,Diésel,Híbrido,Eléctrico',
            'description' => 'nullable|string',
            'status' => 'required|in:Disponible,Reservado,Vendido',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Si el usuario sube una nueva imagen...
        if ($request->hasFile('image')) {
            // 1. Borramos la imagen antigua del disco duro (si existía) para ahorrar espacio
            if ($vehicle->image_path) {
                Storage::disk('public')->delete($vehicle->image_path);
            }
            // 2. Guardamos la nueva imagen y actualizamos la ruta
            $validated['image_path'] = $request->file('image')->store('vehicles', 'public');
        }

        // Actualizamos el registro en la base de datos
        $vehicle->update($validated);

        return redirect()->route('admin.vehicles-for-sale.index');
    }

    /**
     * Elimina un vehículo y su imagen asociada.
     */
    public function destroy(string $id)
    {
        $vehicle = VehicleforSale::findOrFail($id);

        // Si el vehículo tenía foto, la borramos del servidor
        if ($vehicle->image_path) {
            Storage::disk('public')->delete($vehicle->image_path);
        }

        // Borramos el registro de la base de datos
        $vehicle->delete();

        return redirect()->route('admin.vehicles-for-sale.index');
    }
}
