import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, client }) {
    
    // Inicializamos el estado del formulario con los datos actuales del cliente
    const { data, setData, put, processing, errors } = useForm({
        first_name: client.first_name,
        last_name: client.last_name,
        dni_nie: client.dni_nie,
        email: client.email,
        phone: client.phone,
    });

    const submit = (e) => {
        e.preventDefault();
        // Usamos put() porque estamos actualizando un recurso, apuntando a la ruta update con el ID
        put(route("admin.clients.update", client.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editar Cliente: {client.first_name} {client.last_name}
                </h2>
            }
        >
            <Head title={`Editar Cliente - ${client.first_name}`} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                
                                {/* Fila 1: Nombre y Apellidos */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nombre *</label>
                                        <input
                                            type="text"
                                            value={data.first_name}
                                            onChange={e => setData('first_name', e.target.value)}
                                            required
                                            maxLength="255"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.first_name && <div className="text-red-500 text-xs mt-1">{errors.first_name}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Apellidos *</label>
                                        <input
                                            type="text"
                                            value={data.last_name}
                                            onChange={e => setData('last_name', e.target.value)}
                                            required
                                            maxLength="255"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.last_name && <div className="text-red-500 text-xs mt-1">{errors.last_name}</div>}
                                    </div>
                                </div>

                                {/* Fila 2: DNI, Email y Teléfono */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">DNI / NIE *</label>
                                        <input
                                            type="text"
                                            value={data.dni_nie}
                                            onChange={e => setData('dni_nie', e.target.value)}
                                            required
                                            maxLength="20"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.dni_nie && <div className="text-red-500 text-xs mt-1">{errors.dni_nie}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email *</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            required
                                            maxLength="255"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Teléfono *</label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            required
                                            maxLength="20"
                                            pattern="(?:\+34|0034)?[6789]\d{8}"
                                            title="Introduce un teléfono fijo o móvil válido de 9 dígitos (ej: 600123456)"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex justify-end space-x-3 border-t pt-4">
                                    <Link href={route('admin.clients.index')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition">
                                        Cancelar
                                    </Link>
                                    <button type="submit" disabled={processing} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition">
                                        Actualizar Cliente
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}