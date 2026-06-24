import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, vehicles }) {
    
    // Función segura para eliminar un vehículo del historial
    const handleDelete = (id) => {
        if (confirm("¿Seguro que deseas eliminar este vehículo? Se perderá su historial de órdenes de reparación.")) {
            router.delete(route("admin.client-vehicles.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vehículos en Taller</h2>}
        >
            <Head title="Vehículos Taller" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Historial de Coches</h3>
                                <Link
                                    href={route("admin.client-vehicles.create")}
                                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    + Registrar Vehículo
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm whitespace-nowrap">
                                    <thead className="uppercase tracking-wider border-b-2 border-gray-600 bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4">Matrícula</th>
                                            <th className="px-6 py-4">Vehículo</th>
                                            <th className="px-6 py-4">Dueño / Cliente</th>
                                            <th className="px-6 py-4">Nº Bastidor</th>
                                            <th className="px-6 py-4">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.data.map((vehicle) => (
                                            <tr key={vehicle.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                
                                                {/* Matrícula */}
                                                <td className="px-6 py-4">
                                                    <span className="bg-gray-100 text-gray-800 font-mono font-bold px-3 py-1 border border-gray-400 rounded text-sm shadow-sm tracking-wider uppercase">
                                                        {vehicle.license_plate}
                                                    </span>
                                                </td>

                                                {/* Marca, Modelo y Color */}
                                                <td className="px-6 py-4 font-bold text-gray-700">
                                                    {vehicle.car_model.brand.name} {vehicle.car_model.name}
                                                    <div className="text-xs font-normal text-gray-500 capitalize">{vehicle.color} - {vehicle.year}</div>
                                                </td>

                                                {/* Dueño asignado */}
                                                <td className="px-6 py-4">
                                                    <Link href={route('admin.clients.show', vehicle.client.id)} className="text-blue-600 hover:underline font-medium">
                                                        {vehicle.client.first_name} {vehicle.client.last_name}
                                                    </Link>
                                                    <div className="text-xs text-gray-400 font-mono">{vehicle.client.dni_nie}</div>
                                                </td>

                                                {/* Número de Bastidor (VIN) */}
                                                <td className="px-6 py-4 font-mono text-gray-500 text-xs uppercase">
                                                    {vehicle.vin}
                                                </td>

                                                {/* Acciones */}
                                                <td className="px-6 py-4">
                                                    <Link href={route("admin.client-vehicles.edit", vehicle.id)} className="text-blue-600 hover:underline mr-3">
                                                        Editar
                                                    </Link>
                                                    <button onClick={() => handleDelete(vehicle.id)} className="text-red-600 hover:underline">
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Paginación */}
                            <div className="mt-6 flex justify-center">
                                <div className="flex flex-wrap gap-1">
                                    {vehicles.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-4 py-2 border rounded text-sm ${
                                                link.active ? 'bg-blue-800 text-white font-bold border-blue-800' : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}