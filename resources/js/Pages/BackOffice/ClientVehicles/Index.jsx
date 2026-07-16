import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import WorkshopFilterBar from "@/Components/WorkshopFilterBar";

export default function Index({ auth, vehicles, filters }) {
    const handleDelete = (id) => {
        if (confirm("¿Seguro que deseas eliminar este vehículo?")) {
            router.delete(route("admin.client-vehicles.destroy", id));
        }
    };

    const handleFilterChange = (newFilters) => {
        router.get(route('admin.client-vehicles.index'), newFilters, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vehículos en Taller</h2>}>
            <Head title="Vehículos Taller" />
            <div className="py-12">
                <div className="max-w-[95%] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium">Historial de Coches</h3>
                            <Link href={route("admin.client-vehicles.create")} className="bg-blue-800 text-white font-bold py-2 px-4 rounded">+ Registrar Vehículo</Link>
                        </div>

                        <WorkshopFilterBar onFilterChange={handleFilterChange} currentFilters={filters || {}} />

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="uppercase tracking-wider border-b-2 bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4">Matrícula</th>
                                        <th className="px-6 py-4">Modelo</th>
                                        <th className="px-6 py-4">Color - Año</th>
                                        <th className="px-6 py-4">Dueño / Cliente</th>
                                        <th className="px-6 py-4">Nº Bastidor</th>
                                        <th className="px-6 py-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicles.data.map((v) => (
                                        <tr key={v.id} className="border-b hover:bg-gray-100">
                                            <td className="px-6 py-4 font-mono font-bold">{v.license_plate}</td>
                                            <td className="px-6 py-4 font-bold">{v.car_model.brand.name} {v.car_model.name}</td>
                                            <td className="px-6 py-4">{v.color} - {v.year}</td>
                                            <td className="px-6 py-4">
                                                {v.client.first_name} {v.client.last_name}
                                                <div className="text-xs text-gray-400 font-mono">{v.client.dni_nie}</div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs">{v.vin}</td>
                                            <td className="px-6 py-4">
                                                <Link href={route("admin.client-vehicles.edit", v.id)} className="text-blue-600 mr-3">Editar</Link>
                                                <button onClick={() => handleDelete(v.id)} className="text-red-600">Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Bloque de Paginación */}
                        <div className="mt-6 flex justify-center">
                            <div className="flex flex-wrap gap-1">
                                {vehicles.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 border rounded text-sm ${
                                            link.active 
                                                ? 'bg-blue-800 text-white font-bold border-blue-800' 
                                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}