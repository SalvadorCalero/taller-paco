import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, vehicles }) {
    // Función para manejar el borrado con confirmación
    const handleDelete = (id) => {
        if (
            confirm(
                "¿Estás seguro de que deseas eliminar este vehículo? Esta acción no se puede deshacer.",
            )
        ) {
            router.delete(route("admin.vehicles-for-sale.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Inventario de Vehículos
                </h2>
            }
        >
            <Head title="Inventario" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            {/* Cabecera con botón de añadir */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">
                                    Vehículos en Venta
                                </h3>
                                <Link
                                    href={route("admin.vehicles-for-sale.create")}
                                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    + Añadir Vehículo
                                </Link>
                            </div>

                            {/* Tabla de datos */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm whitespace-nowrap">
                                    <thead className="uppercase tracking-wider border-b-2 border-gray-600 bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4">Imagen</th>
                                            <th className="px-6 py-4">Vehículo</th>
                                            <th className="px-6 py-4">Estado</th>
                                            <th className="px-6 py-4">Precio</th>
                                            <th className="px-6 py-4">Disponibilidad</th>
                                            <th className="px-6 py-4">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.data.map((vehicle) => (
                                            <tr
                                                key={vehicle.id}
                                                className="border-b border-gray-200 hover:bg-gray-100"
                                            >
                                                {/* Celda de la Imagen */}
                                                <td className="px-6 py-4">
                                                    {vehicle.image_path ? (
                                                        <img
                                                            src={`/storage/${vehicle.image_path}`}
                                                            alt={`${vehicle.car_model.brand.name} ${vehicle.car_model.name}`}
                                                            className="h-12 w-16 object-cover rounded shadow-sm border border-gray-300"
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-16 bg-gray-200 flex items-center justify-center rounded text-xs text-gray-500 border border-gray-300">
                                                            Sin foto
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Datos del vehículo */}
                                                <td className="px-6 py-4 font-bold text-gray-700">
                                                    {vehicle.car_model.brand.name} {vehicle.car_model.name}
                                                    <div className="text-xs font-normal text-gray-500">
                                                        {vehicle.year} - {vehicle.fuel_type}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-bold ${vehicle.condition === "Nuevo" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}
                                                    >
                                                        {vehicle.condition}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 font-medium">
                                                    {vehicle.price} €
                                                </td>

                                                <td className="px-6 py-4">
                                                    {vehicle.status}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={route("admin.vehicles-for-sale.edit", vehicle.id)}
                                                        className="text-blue-600 hover:underline mr-3"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(vehicle.id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Controles de Paginación */}
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
            </div>
        </AuthenticatedLayout>
    );
}