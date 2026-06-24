import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// Recibimos 'auth' por defecto y 'carModels' que nos manda el controlador
export default function Create({ auth, carModels }) {
    
    // Inicializamos el formulario con los valores por defecto
    const { data, setData, post, processing, errors } = useForm({
        car_model_id: '',
        condition: 'Nuevo',
        price: '',
        year: new Date().getFullYear(), // Año actual por defecto
        mileage: 0,
        fuel_type: 'Gasolina',
        description: '',
        status: 'Disponible',
        image: null,
    });

    // Función que se ejecuta al enviar el formulario
    const submit = (e) => {
        e.preventDefault(); // Evitamos la recarga tradicional del navegador
        post(route('admin.vehicles-for-sale.store')); // Enviamos por POST al método store
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Añadir Nuevo Vehículo</h2>}
        >
            <Head title="Añadir Vehículo" />

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
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Seleccione un modelo...</option>
                                            {carModels.map(model => (
                                                <option key={model.id} value={model.id}>
                                                    {model.brand.name} - {model.name}
                                                </option>
                                            ))}
                                        </select>
                                        {/* Mostramos el error de validación de Laravel si existe */}
                                        {errors.car_model_id && <div className="text-red-500 text-xs mt-1">{errors.car_model_id}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Estado</label>
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
                                        {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
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

                                {/* Fila 3: Descripción */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Descripción / Detalles extra</label>
                                    <textarea
                                        rows="3"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    ></textarea>
                                </div>
                                {/* Fila 4: Subida de Imagen */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fotografía del Vehículo</label>
                                    <input
                                        type="file"
                                        accept="image/jpeg, image/png, image/webp"
                                        // A diferencia de los textos, aquí capturamos el archivo directamente (files[0])
                                        onChange={e => setData('image', e.target.files[0])}
                                        className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-blue-50 file:text-blue-700
                                            hover:file:bg-blue-100"
                                    />
                                    {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                                </div>

                                {/* Botones de acción */}
                                <div className="flex justify-end space-x-3 border-t pt-4">
                                    <Link 
                                        href={route('admin.vehicles-for-sale.index')} 
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Cancelar
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing} // Deshabilita el botón mientras se envía para evitar dobles clics
                                        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        Guardar Vehículo
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