<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\RepairOrder;
use App\Models\ClientVehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RepairOrderController extends Controller
{
    /**
     * Listado general de órdenes del taller.
     */
    public function index(Request $request)
{
    // Obtener todos los departamentos únicos de la tabla para el desplegable
    // Esto hace un "flatten" del JSON para obtener valores únicos
    $allDepartments = RepairOrder::query()
        ->select('department')
        ->get()
        ->pluck('department')
        ->flatten()
        ->unique()
        ->sort()
        ->values();

    $query = RepairOrder::with(['clientVehicle.carModel', 'clientVehicle.client']);

    // ... (tus filtros existentes)
    $query->when($request->status, fn($q, $v) => $q->where('status', $v))
          ->when($request->license_plate, fn($q, $v) => $q->whereHas('clientVehicle', fn($q) => $q->where('license_plate', 'like', "%{$v}%")))
          ->when($request->client_name, fn($q, $v) => $q->whereHas('clientVehicle.client', fn($q) => $q->where('first_name', 'like', "%{$v}%")->orWhere('last_name', 'like', "%{$v}%")))
          ->when($request->department, fn($q, $v) => $q->whereJsonContains('department', $v))
          ->when($request->entry_date_start, fn($q, $v) => $q->whereDate('entry_date', '>=', $v))
          ->when($request->entry_date_end, fn($q, $v) => $q->whereDate('entry_date', '<=', $v));

    return Inertia::render('BackOffice/RepairOrders/Index', [
        'orders' => $query->latest()->paginate(15)->withQueryString(),
        'filters' => $request->only(['status', 'license_plate', 'client_name', 'department', 'entry_date_start', 'entry_date_end']),
        'availableDepartments' => $allDepartments // Pasamos la lista dinámica a la vista
    ]);
}

    /**
     * Muestra el formulario para abrir una nueva orden de reparación.
     */
    public function create(Request $request)
    {
        // Traemos todos los coches con sus matrículas y dueños para el desplegable
        $vehicles = ClientVehicle::with('client', 'carModel.brand')->get();

        // Capturamos el ID del vehículo si venimos desde la ficha del cliente
        $preselectedVehicleId = $request->query('vehicle_id', '');

        return Inertia::render('BackOffice/RepairOrders/Create', [
            'vehicles' => $vehicles,
            'preselectedVehicleId' => $preselectedVehicleId
        ]);
    }

    /**
     * Guarda la nueva orden en la base de datos.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_vehicle_id' => 'required|exists:client_vehicles,id',
            'entry_date' => 'required|date',
            // validamos que los estados sean exactamente los de tu ENUM
            'status' => 'required|in:Pendiente,En Proceso,Listo para Entrega,Entregado',
            'initial_diagnosis' => 'required|string',
            // El departamento debe ser un array porque en tu BD es JSON
            'department' => 'required|array|min:1',
            'department.*' => 'string', // Cada elemento del array debe ser texto
            'work_performed' => 'nullable|string',
            'exit_date' => 'nullable|date|after_or_equal:entry_date',
        ]);

        RepairOrder::create($validated);

        return redirect()->route('admin.repair-orders.index');
    }

    /**
     * Muestra el formulario para gestionar/editar una orden existente.
     */
    public function edit(string $id)
    {
        $order = RepairOrder::findOrFail($id);

        // Volvemos a mandar los vehículos por si se equivocaron al asignarlo
        $vehicles = ClientVehicle::with('client', 'carModel.brand')->get();

        return Inertia::render('BackOffice/RepairOrders/Edit', [
            'order' => $order,
            'vehicles' => $vehicles
        ]);
    }

    /**
     * Valida y actualiza los datos de la orden.
     */
    public function update(Request $request, string $id)
    {
        $order = RepairOrder::findOrFail($id);

        $validated = $request->validate([
            'client_vehicle_id' => 'required|exists:client_vehicles,id',
            'entry_date' => 'required|date',
            'status' => 'required|in:Pendiente,En Proceso,Listo para Entrega,Entregado',
            'initial_diagnosis' => 'required|string',
            'department' => 'required|array|min:1',
            'department.*' => 'string',
            // Estos dos campos cobran protagonismo en la edición
            'work_performed' => 'nullable|string',
            'exit_date' => 'nullable|date|after_or_equal:entry_date',
        ]);

        $order->update($validated);

        return redirect()->route('admin.repair-orders.index');
    }

    /**
     * Elimina la orden de reparación del sistema.
     */
    public function destroy(string $id)
    {
        $order = RepairOrder::findOrFail($id);
        $order->delete();

        return redirect()->route('admin.repair-orders.index');
    }
}
