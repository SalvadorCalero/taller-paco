export default function RepairOrderFilterBar({ onFilterChange, currentFilters, availableDepartments }) {
    
    const handleChange = (e) => {
        onFilterChange({ ...currentFilters, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        onFilterChange({ 
            status: '', 
            license_plate: '', 
            client_name: '', 
            department: '', 
            entry_date_start: '', 
            entry_date_end: '' 
        });
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 items-end">
            
            {/* Filtro Estado */}
            <select name="status" value={currentFilters.status || ''} onChange={handleChange} className="border-gray-300 rounded-md p-2 text-sm">
                <option value="">Estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Listo para Entrega">Listo para Entrega</option>
                <option value="Entregado">Entregado</option>
            </select>

            {/* Filtro Matrícula */}
            <input 
                name="license_plate" 
                placeholder="Matrícula" 
                value={currentFilters.license_plate || ''} 
                onChange={handleChange} 
                className="border-gray-300 rounded-md p-2 text-sm" 
            />

            {/* Filtro Cliente */}
            <input 
                name="client_name" 
                placeholder="Cliente" 
                value={currentFilters.client_name || ''} 
                onChange={handleChange} 
                className="border-gray-300 rounded-md p-2 text-sm" 
            />
            
            {/* Filtro Departamento (Dinámico) */}
            <select name="department" value={currentFilters.department || ''} onChange={handleChange} className="border-gray-300 rounded-md p-2 text-sm">
                <option value="">Departamento</option>
                {availableDepartments && availableDepartments.map(d => (
                    <option key={d} value={d}>{d}</option>
                ))}
            </select>

            {/* Filtros Fecha */}
            <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-gray-500">Desde</label>
                <input 
                    name="entry_date_start" 
                    type="date" 
                    value={currentFilters.entry_date_start || ''} 
                    onChange={handleChange} 
                    className="border-gray-300 rounded-md p-2 text-sm" 
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-gray-500">Hasta</label>
                <input 
                    name="entry_date_end" 
                    type="date" 
                    value={currentFilters.entry_date_end || ''} 
                    onChange={handleChange} 
                    className="border-gray-300 rounded-md p-2 text-sm" 
                />
            </div>
            
            {/* Botón Reset */}
            <button 
                onClick={handleReset} 
                className="bg-gray-600 text-white rounded-md p-2 text-sm hover:bg-gray-700 col-span-2 md:col-span-6 transition"
            >
                Limpiar Filtros
            </button>
        </div>
    );
}