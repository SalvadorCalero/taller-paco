import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, client }) {
    // Depuracion para el navegador
    console.log("Datos del cliente recibidos en React:", client);
    
    // Capturamos el array de vehículos que nos envía el backend
    const vehicles = client.client_vehicles || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Ficha de Cliente: {client.first_name} {client.last_name}
                    </h2>
                    <Link 
                        href={route('admin.clients.index')} 
                        className="text-sm text-gray-600 hover:text-gray-900 hover:underline font-medium"
                    >
                        &larr; Volver al listado
                    </Link>
                </div>
            }
        >
            <Head title={`Ficha - ${client.first_name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Tarjeta 1: Datos Personales */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-6 text-gray-800 border-b pb-2">Datos Personales</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Nombre Completo</p>
                                    <p className="text-base text-gray-900 font-medium mt-1">{client.first_name} {client.last_name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">DNI / NIE</p>
                                    <p className="text-base text-gray-900 font-mono mt-1">{client.dni_nie}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Correo Electrónico</p>
                                    <p className="text-base text-gray-900 mt-1">{client.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Teléfono</p>
                                    <p className="text-base text-gray-900 font-mono mt-1">{client.phone}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Link 
                                    href={route('admin.clients.edit', client.id)} 
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded border text-sm transition"
                                >
                                    Editar Datos
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta 2: Vehículos Vinculados */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6 border-b pb-2">
                                <h3 className="text-lg font-bold text-gray-800">Vehículos Asociados</h3>
                                {/* AQUÍ ESTÁ EL BOTÓN ACTIVADO */}
                                <Link 
                                    href={route('admin.client-vehicles.create', { client_id: client.id })} 
                                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition shadow-sm"
                                >
                                    + Añadir Vehículo
                                </Link>
                            </div>
                            
                            {vehicles.length === 0 ? (
                                // Estado vacío
                                <div className="text-center py-10 bg-gray-50 rounded border border-dashed border-gray-300">
                                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <p className="text-gray-500 italic">No hay ningún vehículo registrado a nombre de este cliente.</p>
                                </div>
                            ) : (
                                // Tabla con el listado real
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                                        <thead className="uppercase tracking-wider border-b border-gray-300 bg-gray-50 text-xs text-gray-600">
                                            <tr>
                                                <th className="px-4 py-3">Matrícula</th>
                                                <th className="px-4 py-3">Marca y Modelo</th>
                                                <th className="px-4 py-3">Color</th>
                                                <th className="px-4 py-3">Año</th>
                                                <th className="px-4 py-3">Nº Bastidor (VIN)</th>
                                                <th className="px-4 py-3">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehicles.map((vehicle) => (
                                                <tr key={vehicle.id} className="border-b border-gray-200 hover:bg-gray-50">
                                                    <td className="px-4 py-3">
                                                        <span className="bg-gray-100 text-gray-800 font-mono font-bold px-2 py-0.5 border border-gray-400 rounded text-xs uppercase shadow-xs tracking-wider">
                                                            {vehicle.license_plate}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 font-bold text-gray-700">
                                                        {vehicle.car_model.brand.name} {vehicle.car_model.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-600 capitalize">
                                                        {vehicle.color}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-600">
                                                        {vehicle.year}
                                                    </td>
                                                    <td className="px-4 py-3 font-mono text-gray-500 text-xs uppercase">
                                                        {vehicle.vin}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Link 
                                                            href={route('admin.client-vehicles.edit', vehicle.id)} 
                                                            className="text-blue-600 hover:underline text-xs font-semibold mr-3"
                                                        >
                                                            Editar Coche
                                                        </Link>
                                                        <button className="text-green-600 hover:underline text-xs font-semibold">
                                                            Nueva Orden
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}