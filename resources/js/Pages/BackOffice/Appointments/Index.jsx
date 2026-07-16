import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import AppointmentFilterBar from "@/Components/AppointmentFilterBar";

export default function Index({ auth, appointments, filters }) {

    const updateStatus = (id, newStatus) => {
        router.patch(route("admin.appointments.update", id), { status: newStatus }, { preserveScroll: true });
    };

    const deleteAppointment = (id) => {
        if (confirm("¿Estás seguro de que quieres eliminar esta cita?")) {
            router.delete(route("admin.appointments.destroy", id), { preserveScroll: true });
        }
    };

    const handleFilterChange = (newFilters) => {
        router.get(route('admin.appointments.index'), newFilters, { 
            preserveState: true, 
            replace: true 
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl">Gestión de Citas</h2>}>
            <Head title="Gestión de Citas" />
            
            <div className="p-6 max-w-[95%] mx-auto">
                
                {/* Barra de filtros con rango de fechas */}
                <AppointmentFilterBar 
                    onFilterChange={handleFilterChange} 
                    currentFilters={filters || {}} 
                />

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 uppercase text-xs text-gray-600">Cliente</th>
                                <th className="p-4 uppercase text-xs text-gray-600">Fecha Propuesta</th>
                                <th className="p-4 uppercase text-xs text-gray-600">Estado</th>
                                <th className="p-4 uppercase text-xs text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.data.map((app) => (
                                <tr key={app.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="font-bold">{app.name}</div>
                                        <div className="text-xs text-gray-500">{app.phone}</div>
                                    </td>
                                    <td className="p-4">
                                        {new Date(app.requested_date).toLocaleString('es-ES')}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            app.status === "Confirmada" ? "bg-green-100 text-green-800" : 
                                            app.status === "Pendiente" ? "bg-yellow-100 text-yellow-800" : 
                                            "bg-red-100 text-red-800"
                                        }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="p-4 space-x-3">
                                        {app.status !== "Confirmada" && (
                                            <button 
                                                onClick={() => updateStatus(app.id, "Confirmada")} 
                                                className="text-green-600 hover:text-green-800 font-bold text-sm"
                                            >
                                                Confirmar
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => deleteAppointment(app.id)} 
                                            className="text-red-600 hover:text-red-800 font-bold text-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <div className="p-4 flex justify-center gap-1">
                        {appointments.links.map((link, i) => (
                            <Link 
                                key={i} 
                                href={link.url || '#'} 
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 border rounded text-sm ${
                                    link.active ? 'bg-blue-800 text-white font-bold' : 'bg-white hover:bg-gray-50 text-gray-700'
                                }`} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}