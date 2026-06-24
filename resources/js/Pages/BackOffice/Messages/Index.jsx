import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function Index({ auth, messages }) {
    const handleStatusChange = (id, newStatus) => {
        router.put(route('admin.messages.update-status', id), { status: newStatus }, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Leads y Mensajes</h2>}>
            <Head title="Mensajes de Contacto" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="min-w-full text-left text-sm whitespace-nowrap">
                                <thead className="uppercase tracking-wider border-b-2 border-gray-600 bg-gray-50 text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Fecha</th>
                                        <th className="px-6 py-4">Cliente</th>
                                        <th className="px-6 py-4">Vehículo</th>
                                        <th className="px-6 py-4">Mensaje</th>
                                        <th className="px-6 py-4">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.data.map((msg) => (
                                        <tr key={msg.id} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-4">{new Date(msg.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-800">{msg.name}</p>
                                                <p className="text-xs text-gray-500">{msg.phone} • {msg.email}</p>
                                            </td>
                                            <td className="px-6 py-4 text-blue-600 font-semibold">
                                                {msg.vehicle ? `${msg.vehicle.car_model.brand.name} ${msg.vehicle.car_model.name}` : 'Vehículo borrado'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal max-w-xs">
                                                <p className="text-gray-600 italic text-xs">"{msg.message}"</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select 
                                                    value={msg.status} 
                                                    onChange={(e) => handleStatusChange(msg.id, e.target.value)}
                                                    className={`text-xs font-bold rounded shadow-sm ${
                                                        msg.status === 'Pendiente' ? 'bg-red-100 text-red-800' : 
                                                        msg.status === 'Contactado' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                                                    }`}
                                                >
                                                    <option value="Pendiente">Pendiente</option>
                                                    <option value="Contactado">Contactado</option>
                                                    <option value="Descartado">Descartado</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    {messages.data.length === 0 && (
                                        <tr><td colSpan="5" className="text-center py-6 text-gray-500">No hay mensajes aún.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}