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

    const handleDelete = (id) => {
        if (confirm("¿Seguro que deseas eliminar este vehículo del inventario?")) {
            router.delete(route("admin.vehicles-for-sale.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventario</h2>}>
            <Head title="Inventario" />
            <div className="py-12 px-4 max-w-[95%] mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 shadow-sm sm:rounded-lg w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium">Listado de Vehículos</h3>
                        <Link 
                            href={route("admin.vehicles-for-sale.create")} 
                            className="bg-blue-800 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition text-sm"
                        >
                            + Registrar Vehículo
                        </Link>
                    </div>

                    <FilterBar onFilterChange={handleFilterChange} />

                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4">Imagen</th>
                                    <th className="px-6 py-4">Vehículo</th>
                                    <th className="px-6 py-4">Condición</th>
                                    <th className="px-6 py-4">Año</th>
                                    <th className="px-6 py-4">Km</th>
                                    <th className="px-6 py-4">Combustible</th>
                                    <th className="px-6 py-4">Precio</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.data.map((v) => (
                                    <tr key={v.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4">
                                            {v.image_path ? (
                                                <img 
                                                    src={`/storage/${v.image_path}`} 
                                                    alt="Vehículo" 
                                                    className="w-20 h-16 object-cover rounded shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-20 h-16 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-400">
                                                    Sin foto
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 font-bold">{v.car_model?.brand?.name} {v.car_model?.name}</td>
                                        <td className="p-4">{v.condition}</td>
                                        <td className="p-4">{v.year}</td>
                                        <td className="p-4">{v.mileage}</td>
                                        <td className="p-4">{v.fuel_type}</td>
                                        <td className="p-4">{v.price} €</td>
                                        <td className="p-4">{v.status}</td>
                                        <td className="p-4 whitespace-nowrap">
                                            <Link 
                                                href={route("admin.vehicles-for-sale.edit", v.id)} 
                                                className="text-blue-600 hover:underline font-semibold mr-3 text-sm"
                                            >
                                                Editar
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(v.id)} 
                                                className="text-red-600 hover:underline font-semibold text-xs"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {vehicles.data.length === 0 && (
                                    <tr>
                                        <td colSpan="9" className="text-center py-10 text-gray-500 italic">
                                            No hay vehículos registrados en este inventario.
                                        </td>
                                    </tr>
                                )}
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