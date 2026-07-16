<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Appointment::query();

        $query->when($request->status, fn($q, $v) => $q->where('status', $v))
            ->when($request->name, fn($q, $v) => $q->where('name', 'like', "%{$v}%"))
            ->when($request->date_start, fn($q, $v) => $q->whereDate('requested_date', '>=', $v))
            ->when($request->date_end, fn($q, $v) => $q->whereDate('requested_date', '<=', $v));

        return Inertia::render('BackOffice/Appointments/Index', [
            'appointments' => $query->latest()->paginate(15)->withQueryString(),
            'filters' => $request->only(['status', 'name', 'date_start', 'date_end'])
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
