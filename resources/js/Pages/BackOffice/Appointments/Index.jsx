import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Index({ appointments }) {
    // Usamos el objeto form para manejar tanto patch como delete
    const form = useForm({
        status: "",
    });

    const updateStatus = (id, newStatus) => {
        form.setData("status", newStatus);
        form.patch(route("admin.appointments.update", id), {
            preserveScroll: true,
        });
    };

    // Función corregida: usando form.delete en lugar de una variable "destroy" inexistente
    const deleteAppointment = (id) => {
        if (confirm("¿Estás seguro de que quieres eliminar esta cita?")) {
            form.delete(route("admin.appointments.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl">Gestión de Citas</h2>}
        >
            <Head title="Gestión de Citas" />

            <div className="p-6">
                <table className="w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">Cliente</th>
                            <th className="p-4 text-left">Fecha Propuesta</th>
                            <th className="p-4 text-left">Estado</th>
                            <th className="p-4 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((app) => (
                            <tr key={app.id} className="border-b">
                                <td className="p-4">
                                    <div className="font-bold">{app.name}</div>
                                    <div className="text-xs text-gray-500">
                                        {app.phone}
                                    </div>
                                </td>
                                <td className="p-4">
                                    {app.requested_date
                                        ? new Date(
                                              app.requested_date,
                                          ).toLocaleString()
                                        : "No especificada"}
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-bold ${
                                            app.status === "Confirmada"
                                                ? "bg-green-100 text-green-800"
                                                : app.status === "Pendiente"
                                                  ? "bg-yellow-100 text-yellow-800"
                                                  : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {app.status}
                                    </span>
                                </td>
                                <td className="p-4 space-x-3">
                                    {app.status !== "Confirmada" && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateStatus(
                                                    app.id,
                                                    "Confirmada",
                                                )
                                            }
                                            className="text-green-600 hover:text-green-800 font-bold text-sm"
                                        >
                                            Confirmar
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteAppointment(app.id)
                                        }
                                        className="text-red-600 hover:text-red-800 font-bold text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
