import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, orders }) {

    // Función para dar un color visual a cada estado del ENUM
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Pendiente":
                return "bg-amber-100 text-amber-800 border-amber-300";
            case "En Proceso":
                return "bg-blue-100 text-blue-800 border-blue-300";
            case "Listo para Entrega":
                return "bg-green-100 text-green-800 border-green-300";
            case "Entregado":
                return "bg-gray-100 text-gray-600 border-gray-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    const handleDelete = (id) => {
        if (confirm("¿Seguro que deseas eliminar esta orden de reparación? Esta acción no se puede deshacer.")) {
            router.delete(route("admin.repair-orders.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Órdenes de Reparación</h2>}
        >
            <Head title="Órdenes del Taller" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-700">Panel de Trabajo del Taller</h3>
                                <Link
                                    href={route("admin.repair-orders.create")}
                                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
                                >
                                    + Abrir Nueva Orden
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm whitespace-nowrap">
                                    <thead className="uppercase tracking-wider border-b-2 border-gray-600 bg-gray-50 text-xs text-gray-600">
                                        <tr>
                                            <th className="px-6 py-4">Estado</th>
                                            <th className="px-6 py-4">Matrícula / Coche</th>
                                            <th className="px-6 py-4">Cliente / Propietario</th>
                                            <th className="px-6 py-4">Departamentos</th>
                                            <th className="px-6 py-4">Fecha Entrada</th>
                                            <th className="px-6 py-4">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.data.map((order) => (
                                            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                                
                                                {/* Estado (Badge de color dinámico) */}
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeClass(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>

                                                {/* Vehículo asociado */}
                                                <td className="px-6 py-4">
                                                    <span className="bg-gray-100 text-gray-800 font-mono font-bold px-2 py-0.5 border border-gray-400 rounded text-xs uppercase tracking-wider mr-2">
                                                        {order.client_vehicle.license_plate}
                                                    </span>
                                                    <span className="font-semibold text-gray-700">
                                                        {order.client_vehicle.car_model.name}
                                                    </span>
                                                </td>

                                                {/* Cliente */}
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">
                                                        {order.client_vehicle.client.first_name} {order.client_vehicle.client.last_name}
                                                    </div>
                                                    <div className="text-xs text-gray-400 font-mono">{order.client_vehicle.client.phone}</div>
                                                </td>

                                                {/* Departamentos (Mapeo del array JSON de MySQL) */}
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {order.department && order.department.map((dep, i) => (
                                                            <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-200">
                                                                {dep}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>

                                                {/* Fecha de entrada formateada */}
                                                <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                                                    {new Date(order.entry_date).toLocaleString('es-ES', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>

                                                {/* Acciones del CRUD */}
                                                <td className="px-6 py-4">
                                                    <Link href={route("admin.repair-orders.edit", order.id)} className="text-blue-600 hover:underline font-semibold mr-3">
                                                        Gestionar / Editar
                                                    </Link>
                                                    <button onClick={() => handleDelete(order.id)} className="text-red-600 hover:underline text-xs">
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {orders.data.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center py-10 bg-gray-50 text-gray-500 italic">
                                                    No hay ninguna orden de reparación abierta en este momento.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Paginación */}
                            <div className="mt-6 flex justify-center">
                                <div className="flex flex-wrap gap-1">
                                    {orders.links.map((link, index) => (
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