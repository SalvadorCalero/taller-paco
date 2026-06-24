import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, vehicles, preselectedVehicleId }) {
    
    const { data, setData, post, processing, errors } = useForm({
        client_vehicle_id: preselectedVehicleId || "",
        // Ponemos la fecha y hora actual por defecto en formato compatible con input datetime-local
        entry_date: new Date().toISOString().slice(0, 16),
        status: "Pendiente", // Estado inicial lógico
        initial_diagnosis: "",
        department: [], // Array vacío para el JSON
        work_performed: "",
        exit_date: "",
    });

    // Función para manejar el array de departamentos (los checkboxes)
    const handleDepartmentChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setData('department', [...data.department, value]);
        } else {
            setData('department', data.department.filter((dep) => dep !== value));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.repair-orders.store"));
    };

    // Departamentos comunes en un taller
    const availableDepartments = ["Mecánica", "Electricidad", "Chapa y Pintura", "Neumáticos", "Mantenimiento / Revisiones"];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Abrir Orden de Reparación</h2>}
        >
            <Head title="Nueva Orden de Reparación" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            <form onSubmit={submit} className="space-y-8">
                                
                                {/* BLOQUE 1: Vehículo y Fechas */}
                                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Datos de Entrada</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Vehículo a reparar *</label>
                                            <select
                                                value={data.client_vehicle_id}
                                                onChange={e => setData('client_vehicle_id', e.target.value)}
                                                required
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Selecciona un vehículo...</option>
                                                {vehicles.map(vehicle => (
                                                    <option key={vehicle.id} value={vehicle.id}>
                                                        [{vehicle.license_plate}] - {vehicle.car_model.brand.name} {vehicle.car_model.name} (Dueño: {vehicle.client.first_name} {vehicle.client.last_name})
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.client_vehicle_id && <div className="text-red-500 text-xs mt-1">{errors.client_vehicle_id}</div>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Fecha y Hora de Entrada *</label>
                                            <input
                                                type="datetime-local"
                                                value={data.entry_date}
                                                onChange={e => setData('entry_date', e.target.value)}
                                                required
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                            {errors.entry_date && <div className="text-red-500 text-xs mt-1">{errors.entry_date}</div>}
                                        </div>

                                    </div>
                                </div>

                                {/* BLOQUE 2: Diagnóstico y Asignación */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Detalles de la Avería</h3>
                                    
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Departamentos Asignados (JSON) *</label>
                                        <div className="flex flex-wrap gap-4">
                                            {availableDepartments.map(dep => (
                                                <label key={dep} className="inline-flex items-center bg-white border border-gray-300 px-3 py-2 rounded shadow-sm cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        value={dep}
                                                        checked={data.department.includes(dep)}
                                                        onChange={handleDepartmentChange}
                                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mr-2"
                                                    />
                                                    <span className="text-sm text-gray-700">{dep}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.department && <div className="text-red-500 text-xs mt-1">{errors.department}</div>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div className="md:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">Diagnóstico Inicial (Motivo de entrada) *</label>
                                            <textarea
                                                value={data.initial_diagnosis}
                                                onChange={e => setData('initial_diagnosis', e.target.value)}
                                                required
                                                rows="4"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Describe los síntomas que reporta el cliente..."
                                            ></textarea>
                                            {errors.initial_diagnosis && <div className="text-red-500 text-xs mt-1">{errors.initial_diagnosis}</div>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Estado de la Orden *</label>
                                            <select
                                                value={data.status}
                                                onChange={e => setData('status', e.target.value)}
                                                required
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm font-bold text-blue-800 bg-blue-50"
                                            >
                                                {/* Tus estados exactos de la BBDD */}
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="En Proceso">En Proceso</option>
                                                <option value="Listo para Entrega">Listo para Entrega</option>
                                                <option value="Entregado">Entregado</option>
                                            </select>
                                            {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* Botones */}
                                <div className="flex justify-end space-x-3 border-t pt-6">
                                    <Link href={route('admin.repair-orders.index')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded transition">
                                        Cancelar
                                    </Link>
                                    <button type="submit" disabled={processing} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50 transition shadow">
                                        Crear Orden
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