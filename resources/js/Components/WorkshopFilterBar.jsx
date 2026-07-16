export default function WorkshopFilterBar({ onFilterChange, currentFilters }) {
    const handleChange = (e) => onFilterChange({ ...currentFilters, [e.target.name]: e.target.value });
    
    const handleReset = () => onFilterChange({ license_plate: '', vin: '', client_name: '', model_name: '', color: '' });

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <input name="license_plate" placeholder="Matrícula" value={currentFilters.license_plate || ''} onChange={handleChange} className="border rounded p-2 text-sm" />
            <input name="model_name" placeholder="Modelo" value={currentFilters.model_name || ''} onChange={handleChange} className="border rounded p-2 text-sm" />
            <input name="color" placeholder="Color" value={currentFilters.color || ''} onChange={handleChange} className="border rounded p-2 text-sm" />
            <input name="client_name" placeholder="Dueño" value={currentFilters.client_name || ''} onChange={handleChange} className="border rounded p-2 text-sm" />
            <input name="vin" placeholder="Bastidor" value={currentFilters.vin || ''} onChange={handleChange} className="border rounded p-2 text-sm" />
            <button onClick={handleReset} className="bg-gray-600 text-white rounded p-2 text-sm hover:bg-gray-700 col-span-2 md:col-span-5">Reset Filtros</button>
        </div>
    );
}