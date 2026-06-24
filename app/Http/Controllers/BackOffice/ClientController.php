<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Muestra el listado de clientes paginado.
     */
    public function index()
    {
        // Traemos a los clientes ordenados por los más recientes
        $clients = Client::latest()->paginate(10);

        return Inertia::render('BackOffice/Clients/Index', [
            'clients' => $clients
        ]);
    }

    /**
     * Muestra el formulario para crear un nuevo cliente.
     */
    public function create()
    {
        return Inertia::render('BackOffice/Clients/Create');
    }

    /**
     * Valida de forma estricta y guarda un nuevo cliente.
     */
    public function store(Request $request)
    {
        // Definimos las reglas de validación
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'dni_nie' => 'required|string|max:20|unique:clients,dni_nie',
            'email' => 'required|email|unique:clients,email',

            // Reemplazamos la regla simple por un array con una Expresión Regular (Regex)
            'phone' => [
                'required',
                'string',
                // Explicación de la Regex:
                // ^(?:\+34|0034)? -> Permite opcionalmente empezar con +34 o 0034 (Prefijo de España)
                // [6789]          -> Obliga a que el número empiece por 6 o 7 (móviles) u 8 o 9 (fijos)
                // \d{8}$          -> Obliga a que le sigan exactamente 8 dígitos numéricos más (9 en total)
                'regex:/^(?:\+34|0034)?[6789]\d{8}$/'
            ],
        ], [
            // Personalizamos el mensaje de error de Laravel si la Regex falla
            'phone.regex' => 'El número de teléfono no es válido. Debe ser un teléfono fijo o móvil de 9 dígitos (ej: 600123456).',
        ]);

        // Si la validación pasa, guardamos de forma segura en la BD
        Client::create($validated);

        return redirect()->route('admin.clients.index');
    }

/**
     * Muestra la ficha detallada del cliente con sus vehículos vinculados.
     */
    public function show(string $id)
    {
        // El secreto está en el "with()". Le decimos a Laravel: 
        // "Trae al cliente, y DE PASO, tráete también todos sus coches, con el modelo y la marca"
        $client = Client::with('clientVehicles.carModel.brand')->findOrFail($id);

        return Inertia::render('BackOffice/Clients/Show', [
            'client' => $client
        ]);
    }

    /**
     * Muestra el formulario para editar un cliente existente.
     */
    public function edit(string $id)
    {
        $client = Client::findOrFail($id);

        return Inertia::render('BackOffice/Clients/Edit', [
            'client' => $client
        ]);
    }

    /**
     * Valida y actualiza los datos del cliente.
     */
    public function update(Request $request, string $id)
    {
        $client = Client::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            // Le decimos que debe ser único, EXCEPTO para el ID de este mismo cliente
            'dni_nie' => 'required|string|max:20|unique:clients,dni_nie,' . $client->id,
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'phone' => [
                'required',
                'string',
                'regex:/^(?:\+34|0034)?[6789]\d{8}$/'
            ],
        ], [
            'phone.regex' => 'El número de teléfono no es válido. Debe ser un teléfono fijo o móvil de 9 dígitos (ej: 600123456).',
        ]);

        $client->update($validated);

        return redirect()->route('admin.clients.index');
    }

    /**
     * Elimina un cliente de la base de datos.
     */
    public function destroy(string $id)
    {
        $client = Client::findOrFail($id);
        $client->delete();

        return redirect()->route('admin.clients.index');
    }
}
