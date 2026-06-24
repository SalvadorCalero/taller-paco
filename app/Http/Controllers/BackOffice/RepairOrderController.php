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
    public function index()
    {
        // Traemos las órdenes junto con los datos del coche, el modelo y el cliente
        $orders = RepairOrder::with(['clientVehicle.carModel', 'clientVehicle.client'])
            ->latest()
            ->paginate(15);

        return Inertia::render('BackOffice/RepairOrders/Index', [
            'orders' => $orders
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
