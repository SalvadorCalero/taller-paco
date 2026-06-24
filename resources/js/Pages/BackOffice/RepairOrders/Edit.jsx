import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, order, vehicles }) {
    
    // Función de ayuda para convertir la fecha de Laravel al formato exacto de HTML5 (YYYY-MM-DDTHH:MM)
    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const d = new Date(dateString);
        // Ajustamos la zona horaria para que no baile la hora en el input
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString().slice(0, 16);
    };

    const { data, setData, put, processing, errors } = useForm({
        client_vehicle_id: order.client_vehicle_id,
        entry_date: formatDateForInput(order.entry_date),
        status: order.status,
        initial_diagnosis: order.initial_diagnosis || "",
        department: order.department || [],
        work_performed: order.work_performed || "",
        exit_date: formatDateForInput(order.exit_date),
    });

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
        put(route("admin.repair-orders.update", order.id));
    };

    const availableDepartments = ["Mecánica", "Electricidad", "Chapa y Pintura", "Neumáticos", "Mantenimiento / Revisiones"];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestionar Orden #{order.id}</h2>}
        >
            <Head title={`Editar Orden #${order.id}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            <form onSubmit={submit} className="space-y-8">
                                
                                {/* BLOQUE 1: Vehículo y Fechas */}
                                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Datos de Entrada / Salida</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Vehículo a reparar *</label>
                                            <select
                                                value={data.client_vehicle_id}
                                                onChange={e => setData('client_vehicle_id', e.target.value)}
                                                required
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {vehicles.map(vehicle => (
                                                    <option key={vehicle.id} value={vehicle.id}>
                                                        [{vehicle.license_plate}] - {vehicle.car_model.brand.name} {vehicle.car_model.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.client_vehicle_id && <div className="text-red-500 text-xs mt-1">{errors.client_vehicle_id}</div>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Fecha de Entrada *</label>
                                            <input
                                                type="datetime-local"
                                                value={data.entry_date}
                                                onChange={e => setData('entry_date', e.target.value)}
                                                required
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                            {errors.entry_date && <div className="text-red-500 text-xs mt-1">{errors.entry_date}</div>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 text-blue-600">Fecha de Salida (Cierre)</label>
                                            <input
                                                type="datetime-local"
                                                value={data.exit_date}
                                                onChange={e => setData('exit_date', e.target.value)}
                                                className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                                            />
                                            {errors.exit_date && <div className="text-red-500 text-xs mt-1">{errors.exit_date}</div>}
                                        </div>

                                    </div>
                                </div>

                                {/* BLOQUE 2: Diagnóstico, Trabajo y Estado */}
                                <div>
                                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                                        <h3 className="text-lg font-bold text-gray-700">Progreso de la Avería</h3>
                                        <div className="flex items-center space-x-2">
                                            <label className="text-sm font-bold text-gray-700">Estado Actual:</label>
                                            <select
                                                value={data.status}
                                                onChange={e => setData('status', e.target.value)}
                                                required
                                                className="block w-48 border-gray-300 rounded-md shadow-sm font-bold text-blue-800 bg-blue-100"
                                            >
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="En Proceso">En Proceso</option>
                                                <option value="Listo para Entrega">Listo para Entrega</option>
                                                <option value="Entregado">Entregado</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Departamentos Implicados *</label>
                                        <div className="flex flex-wrap gap-4">
                                            {availableDepartments.map(dep => (
                                                <label key={dep} className="inline-flex items-center bg-white border border-gray-300 px-3 py-2 rounded shadow-sm cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        value={dep}
                                                        checked={data.department.includes(dep)}
                                                        onChange={handleDepartmentChange}
                                                        className="rounded border-gray-300 text-blue-600 shadow-sm mr-2"
                                                    />
                                                    <span className="text-sm text-gray-700">{dep}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.department && <div className="text-red-500 text-xs mt-1">{errors.department}</div>}
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Diagnóstico Inicial</label>
                                            <textarea
                                                value={data.initial_diagnosis}
                                                onChange={e => setData('initial_diagnosis', e.target.value)}
                                                required
                                                rows="3"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600"
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-800">Trabajo Realizado (Notas del Mecánico)</label>
                                            <textarea
                                                value={data.work_performed}
                                                onChange={e => setData('work_performed', e.target.value)}
                                                rows="5"
                                                className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-2"
                                                placeholder="Detalla aquí las piezas sustituidas, los ajustes realizados, etc..."
                                            ></textarea>
                                            {errors.work_performed && <div className="text-red-500 text-xs mt-1">{errors.work_performed}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* Botones */}
                                <div className="flex justify-end space-x-3 border-t pt-6">
                                    <Link href={route('admin.repair-orders.index')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded transition">
                                        Cancelar
                                    </Link>
                                    <button type="submit" disabled={processing} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50 transition shadow">
                                        Guardar Cambios
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