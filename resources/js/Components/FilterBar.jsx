import { router } from "@inertiajs/react";
import { useState, useEffect } from 'react';

export default function FilterBar({ schema }) {
    const params = new URLSearchParams(window.location.search);
    // Estado local para los inputs de texto para no perder el foco
    const [values, setValues] = useState({});

    // Sincronizar estado inicial con la URL
    useEffect(() => {
        const initialValues = {};
        schema.forEach(f => {
            if (f.type === 'text') initialValues[f.name] = params.get(f.name) || '';
        });
        setValues(initialValues);
    }, []);

    const handleChange = (name, value) => {
        setValues(prev => ({ ...prev, [name]: value }));
    };

    // DEBOUNCE: Espera 500ms tras dejar de escribir para disparar la búsqueda
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const currentParams = new URLSearchParams(window.location.search);
            Object.keys(values).forEach(key => {
                if (values[key]) currentParams.set(key, values[key]);
                else currentParams.delete(key);
            });

            if (Object.keys(values).length > 0) {
                router.get(window.location.pathname, Object.fromEntries(currentParams), {
                    preserveState: true,
                    replace: true,
                });
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [values]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 w-full">
            {schema.map(f => (
                <div key={f.name} className="flex flex-col w-full">
                    <label className="text-[11px] font-bold uppercase text-gray-600 mb-1.5">{f.label}</label>
                    
                    {f.type === 'text' ? (
                        <input type="text" className="w-full border-gray-300 rounded-md text-sm py-2"
                            value={values[f.name] || ''}
                            onChange={(e) => handleChange(f.name, e.target.value)} />
                    ) : (
                        <select value={params.get(f.name) || ''} onChange={(e) => {
                            const p = new URLSearchParams(window.location.search);
                            if(e.target.value) p.set(f.name, e.target.value); else p.delete(f.name);
                            router.get(window.location.pathname, Object.fromEntries(p), { preserveState: true, replace: true });
                        }} className="border-gray-300 rounded-md text-sm py-2 w-full">
                            <option value="">Todos</option>
                            {f.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    )}
                </div>
            ))}
            <div className="flex items-end">
                <button onClick={() => window.location.href = window.location.pathname} 
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded font-bold transition">
                    Reset
                </button>
            </div>
        </div>
    );
}