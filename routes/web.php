<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BackOffice\VehicleForSaleController;
use App\Http\Controllers\BackOffice\ClientController;
use App\Http\Controllers\BackOffice\ClientVehicleController;
use App\Http\Controllers\BackOffice\RepairOrderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| FRONT-OFFICE (Parte Pública)
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


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

require __DIR__.'/auth.php';