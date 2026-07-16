import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import GlobalSearch from "@/Components/GlobalSearch";

export default function Index({ auth, clients }) {
    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
            router.delete(route("admin.clients.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestión de Clientes</h2>}>
            <Head title="Clientes" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                                <h3 className="text-lg font-medium">Listado de Clientes</h3>
                                <div className="flex items-center gap-4">
                                    <GlobalSearch />
                                    <Link href={route("admin.clients.create")} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        + Registrar Cliente
                                    </Link>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm whitespace-nowrap">
                                    <thead className="uppercase tracking-wider border-b-2 border-gray-600 bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4">Nombre y Contacto</th>
                                            <th className="px-6 py-4">DNI / NIE</th>
                                            <th className="px-6 py-4">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clients.data.map((client) => (
                                            <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-800 text-base">{client.first_name} {client.last_name}</div>
                                                    <div className="text-gray-500">{client.email}</div>
                                                    <div className="text-gray-500 font-mono text-xs mt-1">{client.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 font-mono">{client.dni_nie}</td>
                                                <td className="px-6 py-4">
                                                    <Link href={route("admin.clients.show", client.id)} className="text-green-600 font-bold hover:underline mr-4">Ver Ficha</Link>
                                                    <Link href={route("admin.clients.edit", client.id)} className="text-blue-600 hover:underline mr-3">Editar</Link>
                                                    <button onClick={() => handleDelete(client.id)} className="text-red-600 hover:underline">Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <div className="flex flex-wrap gap-1">
                                    {clients.links.map((link, index) => (
                                        <Link key={index} href={link.url || "#"} dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-4 py-2 border rounded text-sm ${link.active ? "bg-blue-800 text-white font-bold" : "bg-white text-gray-700 hover:bg-gray-100"}`}
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