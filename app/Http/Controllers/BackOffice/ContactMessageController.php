<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactMessage::with('vehicle.carModel.brand');

        $query->when($request->status, fn($q, $v) => $q->where('status', $v))
            ->when($request->name, fn($q, $v) => $q->where('name', 'like', "%{$v}%"))
            ->when($request->date_start, fn($q, $v) => $q->whereDate('created_at', '>=', $v))
            ->when($request->date_end, fn($q, $v) => $q->whereDate('created_at', '<=', $v));

        return Inertia::render('BackOffice/Messages/Index', [
            'messages' => $query->latest()->paginate(15)->withQueryString(),
            'filters' => $request->only(['status', 'name', 'date_start', 'date_end'])
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->update(['status' => $request->status]);
        return back();
    }
}
