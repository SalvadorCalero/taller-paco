<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index(Request $request)
{
    $query = Client::query();

    $query->when($request->dni_nie, fn($q, $v) => $q->where('dni_nie', 'like', "%{$v}%"))
          ->when($request->first_name, fn($q, $v) => $q->where('first_name', 'like', "%{$v}%"))
          ->when($request->last_name, fn($q, $v) => $q->where('last_name', 'like', "%{$v}%"))
          ->when($request->phone, fn($q, $v) => $q->where('phone', 'like', "%{$v}%"))
          ->when($request->email, fn($q, $v) => $q->where('email', 'like', "%{$v}%"));

    return Inertia::render('BackOffice/Clients/Index', [
        'clients' => $query->latest()->paginate(10)->withQueryString(),
        'filters' => $request->only(['dni_nie', 'first_name', 'last_name', 'phone', 'email'])
    ]);
}

    public function create() { return Inertia::render('BackOffice/Clients/Create'); }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'dni_nie' => 'required|string|max:20|unique:clients,dni_nie',
            'email' => 'required|email|unique:clients,email',
            'phone' => ['required', 'string', 'regex:/^(?:\+34|0034)?[6789]\d{8}$/'],
        ]);
        Client::create($validated);
        return redirect()->route('admin.clients.index');
    }

    public function show(string $id)
    {
        $client = Client::with('clientVehicles.carModel.brand')->findOrFail($id);
        return Inertia::render('BackOffice/Clients/Show', ['client' => $client]);
    }

    public function edit(string $id)
    {
        $client = Client::findOrFail($id);
        return Inertia::render('BackOffice/Clients/Edit', ['client' => $client]);
    }

    public function update(Request $request, string $id)
    {
        $client = Client::findOrFail($id);
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'dni_nie' => 'required|string|max:20|unique:clients,dni_nie,' . $client->id,
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'phone' => ['required', 'string', 'regex:/^(?:\+34|0034)?[6789]\d{8}$/'],
        ]);
        $client->update($validated);
        return redirect()->route('admin.clients.index');
    }

    public function destroy(string $id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return redirect()->route('admin.clients.index');
    }
}