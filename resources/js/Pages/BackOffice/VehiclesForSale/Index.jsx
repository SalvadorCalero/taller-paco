import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, vehicles }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventario de Vehículos</h2>}
        >
            <Head title="Inventario" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Vehículos en Venta</h3>
                                <Link 
                                    href={route('admin.vehicles-for-sale.create')} 
                                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    + Añadir Vehículo
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm whitespace-nowrap">
                                    <thead className="uppercase tracking-wider border-b-2 border-gray-600 bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4">Vehículo</th>
                                            <th className="px-6 py-4">Estado</th>
                                            <th className="px-6 py-4">Precio</th>
                                            <th className="px-6 py-4">Disponibilidad</th>
                                            <th className="px-6 py-4">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.data.map((vehicle) => (
                                            <tr key={vehicle.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="px-6 py-4 font-bold text-gray-700">
                                                    {vehicle.car_model.brand.name} {vehicle.car_model.name}
                                                    <div className="text-xs font-normal text-gray-500">{vehicle.year} - {vehicle.fuel_type}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${vehicle.condition === 'Nuevo' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                                        {vehicle.condition}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-medium">{vehicle.price} €</td>
                                                <td className="px-6 py-4">{vehicle.status}</td>
                                                <td className="px-6 py-4">
                                                    <Link href={route('admin.vehicles-for-sale.edit', vehicle.id)} className="text-blue-600 hover:underline mr-3">Editar</Link>
                                                    {/* Botón de eliminar pendiente de programar */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}