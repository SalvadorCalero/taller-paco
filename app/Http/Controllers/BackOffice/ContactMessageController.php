<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::with('vehicle.carModel.brand')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('BackOffice/Messages/Index', [
            'messages' => $messages
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->update(['status' => $request->status]);
        return back();
    }
}