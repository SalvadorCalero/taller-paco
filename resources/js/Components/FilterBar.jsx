import { useState } from 'react';

export default function FilterBar({ onFilterChange }) {
    const [filters, setFilters] = useState({
        condition: '', 
        price_min: '', 
        price_max: '', 
        year_min: '', 
        year_max: '', 
        mileage_min: '', 
        mileage_max: '', 
        fuel_type: '', 
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        const resetFilters = { 
            condition: '', price_min: '', price_max: '', year_min: '', year_max: '', 
            mileage_min: '', mileage_max: '', fuel_type: '', status: '' 
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 w-full items-end">
            
            {/* Selects */}
            {[
                { name: 'condition', label: 'Condición', opts: ['Nuevo', 'SegundaMano'] },
                { name: 'fuel_type', label: 'Combustible', opts: ['Gasolina', 'Diésel', 'Híbrido', 'Eléctrico'] },
                { name: 'status', label: 'Estado', opts: ['Disponible', 'Reservado', 'Vendido'] }
            ].map(f => (
                <div key={f.name} className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase text-gray-500 mb-1">{f.label}</label>
                    <select name={f.name} value={filters[f.name]} onChange={handleChange} className="border-gray-300 rounded-md text-sm py-2">
                        <option value="">Todos</option>
                        {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                </div>
            ))}

            {/* Rangos (Precio, Año, Kilómetros) */}
            {[
                { name: 'price', label: 'Precio' },
                { name: 'year', label: 'Año' },
                { name: 'mileage', label: 'Kilómetros' }
            ].map(f => (
                <div key={f.name} className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">{f.label}</label>
                    <div className="flex gap-1">
                        <input name={`${f.name}_min`} placeholder="Min" value={filters[`${f.name}_min`]} onChange={handleChange} className="border-gray-300 rounded-md text-sm py-2 w-full" />
                        <input name={`${f.name}_max`} placeholder="Max" value={filters[`${f.name}_max`]} onChange={handleChange} className="border-gray-300 rounded-md text-sm py-2 w-full" />
                    </div>
                </div>
            ))}

            <button 
                type="button" 
                onClick={handleReset} 
                className="bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 text-sm h-[38px]"
            >
                Reset
            </button>
        </div>
    );
}