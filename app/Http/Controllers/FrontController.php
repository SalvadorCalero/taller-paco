<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VehicleforSale;
use App\Models\Brand;
use App\Models\CarModel;
use Inertia\Inertia;
use App\Models\ContactMessage;
use App\Models\Appointment;

class FrontController extends Controller
{
    /**
     * Muestra la página de inicio (Portada).
     */
    public function home()
    {
        // Traemos los 3 últimos coches añadidos usando VehicleforSale
        $featuredCars = VehicleforSale::with('carModel.brand')->latest()->take(3)->get();
        return Inertia::render('FrontOffice/Home', [
            'featuredCars' => $featuredCars
        ]);
    }

    /**
     * Muestra la página genérica de contacto del taller
     */
    public function contact()
    {
        return Inertia::render('FrontOffice/Contact');
    }

    /**
     * Muestra el catálogo dinámico con filtros.
     */
    public function catalog(Request $request)
    {
        // 1. Recoger parámetros de búsqueda (ahora incluimos 'condition')
        $brandId = $request->query('brand_id');
        $modelId = $request->query('model_id');
        $condition = $request->query('condition'); // <-- NUEVO

        // 2. Construir la consulta base
        $query = VehicleForSale::with('carModel.brand');

        // Aplicamos los filtros condicionalmente
        if ($brandId) {
            $query->whereHas('carModel', function ($q) use ($brandId) {
                $q->where('brand_id', $brandId);
            });
        }

        if ($modelId) {
            $query->where('car_model_id', $modelId);
        }

        if ($condition) {
            $query->where('condition', $condition); // <-- NUEVO: Filtro por estado
        }

        $cars = $query->latest()->paginate(9)->withQueryString();

        // 3. Traer Marcas y Modelos para poblar los selects
        $brands = Brand::orderBy('name')->get();
        $carModels = CarModel::select('id', 'name', 'brand_id')->orderBy('name')->get();

        return Inertia::render('FrontOffice/Catalog', [
            'cars' => $cars,
            'brands' => $brands,
            'carModels' => $carModels,
            'filters' => [
                'brand_id' => $brandId,
                'model_id' => $modelId,
                'condition' => $condition, // <-- Pasamos el estado actual a React
            ]
        ]);
    }

    /**
     * Muestra la ficha individual del vehículo en venta
     */
    public function showCar($id)
    {
        $car = VehicleforSale::with('carModel.brand')->findOrFail($id);
        return Inertia::render('FrontOffice/CarDetail', [
            'car' => $car
        ]);
    }

    /**
     * Guarda el mensaje de contacto desde la ficha del vehículo
     */
    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:vehicles_for_sale,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string',
        ]);

        ContactMessage::create([
            'vehicle_for_sale_id' => $validated['car_id'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'message' => $validated['message'],
            'status' => 'Pendiente',
        ]);

        return back();
    }

    /**
     * Guarda la solicitud de cita previa desde la web pública
     */
    public function storeAppointment(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'reason' => 'required|string',
            // Cambiamos a 'nullable' para que no falle si no es cita previa
            'license_plate' => 'nullable|string|max:15',
            'requested_date' => 'nullable|date|after:now',
            'message' => 'nullable|string',
        ]);

        Appointment::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'reason' => $validated['reason'],
            'license_plate' => $validated['license_plate'] ?? null, // Si no existe, pon null explícito
            'requested_date' => $validated['requested_date'] ?? null, // <--- Esto es clave
            'message' => $validated['message'] ?? null,
            'status' => 'Pendiente',
        ]);

        return back();
    }
}
