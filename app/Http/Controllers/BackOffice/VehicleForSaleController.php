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
     * Muestra el listado principal del inventario con filtros de texto simples.
     */
    public function index(Request $request)
    {
        $query = VehicleforSale::with('carModel.brand');

        // Filtros exactos
        $query->when($request->condition, fn($q, $v) => $q->where('condition', $v))
              ->when($request->fuel_type, fn($q, $v) => $q->where('fuel_type', $v))
              ->when($request->status, fn($q, $v) => $q->where('status', $v));

        // Filtros de Rango
        $query->when($request->price_min, fn($q, $v) => $q->where('price', '>=', $v))
              ->when($request->price_max, fn($q, $v) => $q->where('price', '<=', $v))
              ->when($request->year_min, fn($q, $v) => $q->where('year', '>=', $v))
              ->when($request->year_max, fn($q, $v) => $q->where('year', '<=', $v))
              ->when($request->mileage_min, fn($q, $v) => $q->where('mileage', '>=', $v))
              ->when($request->mileage_max, fn($q, $v) => $q->where('mileage', '<=', $v));

        return Inertia::render('BackOffice/VehiclesForSale/Index', [
            'vehicles' => $query->latest()->paginate(10)->withQueryString()
        ]);
    }

    public function create()
    {
        $carModels = CarModel::with('brand')->get();
        return Inertia::render('BackOffice/VehiclesForSale/Create', ['carModels' => $carModels]);
    }

    public function store(Request $request)
    {
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

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('vehicles', 'public');
        }

        VehicleforSale::create($validated);
        return redirect()->route('admin.vehicles-for-sale.index');
    }

    public function edit(string $id)
    {
        $vehicle = VehicleforSale::findOrFail($id);
        $carModels = CarModel::with('brand')->get();
        return Inertia::render('BackOffice/VehiclesForSale/Edit', ['vehicle' => $vehicle, 'carModels' => $carModels]);
    }

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

        if ($request->hasFile('image')) {
            if ($vehicle->image_path) Storage::disk('public')->delete($vehicle->image_path);
            $validated['image_path'] = $request->file('image')->store('vehicles', 'public');
        }

        $vehicle->update($validated);
        return redirect()->route('admin.vehicles-for-sale.index');
    }

    public function destroy(string $id)
    {
        $vehicle = VehicleforSale::findOrFail($id);
        if ($vehicle->image_path) Storage::disk('public')->delete($vehicle->image_path);
        $vehicle->delete();
        return redirect()->route('admin.vehicles-for-sale.index');
    }
}