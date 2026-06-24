import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, vehicle, carModels }) {
    
    // Inicializamos el formulario con los datos actuales del vehículo
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Truco vital de Inertia para subir archivos al editar
        car_model_id: vehicle.car_model_id,
        condition: vehicle.condition,
        price: vehicle.price,
        year: vehicle.year,
        mileage: vehicle.mileage,
        fuel_type: vehicle.fuel_type,
        description: vehicle.description || '',
        status: vehicle.status,
        image: null, // Solo se rellena si el usuario quiere cambiar la foto
    });

    const submit = (e) => {
        e.preventDefault();
        // Aunque actualizamos, usamos post() por la limitación de archivos comentada
        post(route('admin.vehicles-for-sale.update', vehicle.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Vehículo</h2>}
        >
            <Head title="Editar Vehículo" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            <form onSubmit={submit} className="space-y-6">
                                
                                {/* Fila 1: Modelo y Estado */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Marca y Modelo</label>
                                        <select
                                            value={data.car_model_id}
                                            onChange={e => setData('car_model_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            {carModels.map(model => (
                                                <option key={model.id} value={model.id}>
                                                    {model.brand.name} - {model.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Estado general</label>
                                        <select
                                            value={data.condition}
                                            onChange={e => setData('condition', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="Nuevo">Nuevo</option>
                                            <option value="SegundaMano">Segunda Mano</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Fila 2: Precio, Año, Kilómetros, Combustible */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Precio (€)</label>
                                        <input
                                            type="number"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Año</label>
                                        <input
                                            type="number"
                                            value={data.year}
                                            onChange={e => setData('year', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Kilometraje</label>
                                        <input
                                            type="number"
                                            value={data.mileage}
                                            onChange={e => setData('mileage', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Combustible</label>
                                        <select
                                            value={data.fuel_type}
                                            onChange={e => setData('fuel_type', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="Gasolina">Gasolina</option>
                                            <option value="Diésel">Diésel</option>
                                            <option value="Híbrido">Híbrido</option>
                                            <option value="Eléctrico">Eléctrico</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Fila 3: Estado de Venta */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Estado de Disponibilidad</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm font-bold"
                                    >
                                        <option value="Disponible">Disponible</option>
                                        <option value="Reservado">Reservado</option>
                                        <option value="Vendido">Vendido</option>
                                    </select>
                                </div>

                                {/* Fila 4: Descripción */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                                    <textarea
                                        rows="3"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    ></textarea>
                                </div>

                                {/* Fila 5: Imagen (Solo si se quiere cambiar) */}
                                <div className="bg-gray-50 p-4 border rounded-md flex items-center space-x-4">
                                    {vehicle.image_path && (
                                        <img src={`/storage/${vehicle.image_path}`} alt="Foto actual" className="h-16 w-16 object-cover rounded shadow" />
                                    )}
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">Cambiar fotografía (opcional)</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('image', e.target.files[0])}
                                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                </div>

                                {/* Botones */}
                                <div className="flex justify-end space-x-3 border-t pt-4">
                                    <Link href={route('admin.vehicles-for-sale.index')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                                        Cancelar
                                    </Link>
                                    <button type="submit" disabled={processing} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
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