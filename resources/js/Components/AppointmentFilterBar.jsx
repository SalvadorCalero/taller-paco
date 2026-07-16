export default function AppointmentFilterBar({ onFilterChange, currentFilters }) {
    const handleChange = (e) => onFilterChange({ ...currentFilters, [e.target.name]: e.target.value });
    const handleReset = () => onFilterChange({ status: '', name: '', date_start: '', date_end: '' });

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border items-end">
            <input name="name" placeholder="Nombre cliente" value={currentFilters.name || ''} onChange={handleChange} className="border rounded p-2 text-sm" />
            <select name="status" value={currentFilters.status || ''} onChange={handleChange} className="border rounded p-2 text-sm">
                <option value="">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
            </select>
            <input name="date_start" type="date" title="Fecha inicio" value={currentFilters.date_start || ''} onChange={handleChange} className="border rounded p-2 text-sm" />
            <input name="date_end" type="date" title="Fecha fin" value={currentFilters.date_end || ''} onChange={handleChange} className="border rounded p-2 text-sm" />
            <button onClick={handleReset} className="bg-gray-600 text-white rounded p-2 text-sm hover:bg-gray-700">Reset</button>
        </div>
    );
}