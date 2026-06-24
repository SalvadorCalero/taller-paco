<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        return Inertia::render('BackOffice/Appointments/Index', [
            'appointments' => Appointment::latest()->get()
        ]);
    }

    // En AppointmentController.php, en el método update:
    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'status' => 'required|in:Pendiente,Confirmada,Cancelada',
        ]);
        $appointment->update($validated);
        return to_route('admin.appointments.index');
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return back();
    }
}
