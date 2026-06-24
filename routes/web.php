<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BackOffice\VehicleForSaleController;
use App\Http\Controllers\BackOffice\ClientController;
use App\Http\Controllers\BackOffice\ClientVehicleController;
use App\Http\Controllers\BackOffice\RepairOrderController;
use App\Http\Controllers\BackOffice\ContactMessageController;
use App\Http\Controllers\FrontController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| FRONT-OFFICE (Parte Pública)
|--------------------------------------------------------------------------
*/
Route::get('/', [FrontController::class, 'home'])->name('home');
Route::get('/vehiculos', [FrontController::class, 'catalog'])->name('catalog');
Route::get('/vehiculos/{id}', [FrontController::class, 'showCar'])->name('catalog.show');
Route::post('/contacto/vehiculo', [FrontController::class, 'storeContact'])->name('public.contact.store');
Route::get('/contacto', [FrontController::class, 'contact'])->name('contact');
Route::post('/contacto/cita', [FrontController::class, 'storeAppointment'])->name('public.appointment.store');


/*
|--------------------------------------------------------------------------
| BACK-OFFICE (Panel de Gestión Interna Protegido)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {

    // Dashboard principal
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Gestión de Inventario
    Route::resource('vehicles-for-sale', VehicleForSaleController::class);
    

    // Flujo del Taller
    Route::resource('clients', ClientController::class);
    Route::resource('client-vehicles', ClientVehicleController::class);
    Route::resource('repair-orders', RepairOrderController::class);

    // Gestión de Mensajes y Leads
    Route::get('/mensajes', [ContactMessageController::class, 'index'])->name('messages.index');
    Route::put('/mensajes/{id}/estado', [ContactMessageController::class, 'updateStatus'])->name('messages.update-status');

    
    // En web.php, dentro del grupo admin:
Route::resource('appointments', App\Http\Controllers\BackOffice\AppointmentController::class)
    ->names('appointments') // Esto fuerza el nombre admin.appointments.update
    ->only(['index', 'update', 'destroy']);
});


/*
|--------------------------------------------------------------------------
| RUTAS DEL PERFIL (Generadas por Breeze)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';