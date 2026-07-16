export default function ClientFilterBar({ onFilterChange, currentFilters }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...currentFilters, [name]: value });
    };

    const handleReset = () => {
        onFilterChange({ dni_nie: '', first_name: '', last_name: '', phone: '', email: '' });
    };

    const fields = [
        { name: 'dni_nie', label: 'DNI / NIE' },
        { name: 'first_name', label: 'Nombre' },
        { name: 'last_name', label: 'Apellidos' },
        { name: 'phone', label: 'Teléfono' },
        { name: 'email', label: 'Email' }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 w-full items-end">
            {fields.map(f => (
                <div key={f.name} className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase text-gray-500 mb-1">{f.label}</label>
                    <input 
                        name={f.name} 
                        type="text" 
                        value={currentFilters[f.name] || ''} 
                        onChange={handleChange} 
                        className="border-gray-300 rounded-md text-sm py-2 w-full" 
                    />
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