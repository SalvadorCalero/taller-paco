<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\VehicleForSale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleForSaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Traemos los vehículos paginados de 10 en 10, incluyendo la relación con el modelo y su marca
        $vehicles = VehicleForSale::with('carModel.brand')->latest()->paginate(10);

        // Renderizamos el componente de React y le pasamos los datos
        return Inertia::render('BackOffice/VehiclesForSale/Index', [
            'vehicles' => $vehicles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
