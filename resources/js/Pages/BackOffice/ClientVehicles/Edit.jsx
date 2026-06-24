import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, vehicle, clients, carModels }) {
    
    // Inicializamos el formulario con los datos actuales del vehículo
    const { data, setData, put, processing, errors } = useForm({
        client_id: vehicle.client_id,
        car_model_id: vehicle.car_model_id,
        license_plate: vehicle.license_plate,
        vin: vehicle.vin,
        color: vehicle.color,
        year: vehicle.year,
    });

    const submit = (e) => {
        e.preventDefault();
        // Usamos put() apuntando a la ruta update con el ID del vehículo
        put(route("admin.client-vehicles.update", vehicle.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Vehículo - {vehicle.license_plate}</h2>}
        >
            <Head title={`Editar Vehículo ${vehicle.license_plate}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            <form onSubmit={submit} className="space-y-6">
                                
                                {/* Fila 1: Cliente Dueño */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cliente Propietario *</label>
                                    <select
                                        value={data.client_id}
                                        onChange={e => setData('client_id', e.target.value)}
                                        required
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Selecciona un cliente...</option>
                                        {clients.map(client => (
                                            <option key={client.id} value={client.id}>
                                                {client.first_name} {client.last_name} - DNI: {client.dni_nie}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.client_id && <div className="text-red-500 text-xs mt-1">{errors.client_id}</div>}
                                </div>

                                {/* Fila 2: Marca/Modelo y Matrícula */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Marca y Modelo *</label>
                                        <select
                                            value={data.car_model_id}
                                            onChange={e => setData('car_model_id', e.target.value)}
                                            required
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Selecciona un modelo...</option>
                                            {carModels.map(model => (
                                                <option key={model.id} value={model.id}>
                                                    {model.brand.name} - {model.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.car_model_id && <div className="text-red-500 text-xs mt-1">{errors.car_model_id}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Matrícula *</label>
                                        <input
                                            type="text"
                                            value={data.license_plate}
                                            onChange={e => setData('license_plate', e.target.value.toUpperCase())}
                                            required
                                            maxLength="20"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm uppercase font-mono font-bold"
                                        />
                                        {errors.license_plate && <div className="text-red-500 text-xs mt-1">{errors.license_plate}</div>}
                                    </div>
                                </div>

                                {/* Fila 3: VIN, Color y Año */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nº de Bastidor (VIN) *</label>
                                        <input
                                            type="text"
                                            value={data.vin}
                                            onChange={e => setData('vin', e.target.value.toUpperCase())}
                                            required
                                            maxLength="50"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm uppercase font-mono"
                                        />
                                        {errors.vin && <div className="text-red-500 text-xs mt-1">{errors.vin}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Color *</label>
                                        <input
                                            type="text"
                                            value={data.color}
                                            onChange={e => setData('color', e.target.value)}
                                            required
                                            maxLength="50"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.color && <div className="text-red-500 text-xs mt-1">{errors.color}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Año de Matriculación *</label>
                                        <input
                                            type="number"
                                            value={data.year}
                                            onChange={e => setData('year', e.target.value)}
                                            required
                                            min="1950"
                                            max={new Date().getFullYear() + 1}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.year && <div className="text-red-500 text-xs mt-1">{errors.year}</div>}
                                    </div>
                                </div>

                                {/* Botones */}
                                <div className="flex justify-end space-x-3 border-t pt-4">
                                    <Link href={route('admin.client-vehicles.index')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition">
                                        Cancelar
                                    </Link>
                                    <button type="submit" disabled={processing} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition">
                                        Actualizar Vehículo
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