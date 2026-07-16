import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import FilterBar from "@/Components/FilterBar";

export default function Index({ auth, vehicles }) {
    const handleFilterChange = (filters) => {
        router.get(route('admin.vehicles-for-sale.index'), filters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventario</h2>}>
            <Head title="Inventario" />
            <div className="py-12 px-4 w-full">
                <div className="bg-white p-6 shadow-sm sm:rounded-lg w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium">Listado de Vehículos</h3>
                    </div>

                    <FilterBar onFilterChange={handleFilterChange} />

                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4">Vehículo</th>
                                    <th className="px-6 py-4">Condición</th>
                                    <th className="px-6 py-4">Año</th>
                                    <th className="px-6 py-4">Km</th>
                                    <th className="px-6 py-4">Combustible</th>
                                    <th className="px-6 py-4">Precio</th>
                                    <th className="px-6 py-4">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.data.map((v) => (
                                    <tr key={v.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-bold">{v.car_model?.brand?.name} {v.car_model?.name}</td>
                                        <td className="p-4">{v.condition}</td>
                                        <td className="p-4">{v.year}</td>
                                        <td className="p-4">{v.mileage}</td>
                                        <td className="p-4">{v.fuel_type}</td>
                                        <td className="p-4">{v.price} €</td>
                                        <td className="p-4">{v.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Bloque de Paginación */}
                    <div className="mt-8 flex justify-center items-center gap-1">
                        {vehicles.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 border rounded text-sm ${
                                    link.active 
                                        ? 'bg-blue-800 text-white font-bold' 
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}