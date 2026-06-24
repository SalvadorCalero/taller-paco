import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Catalog({ cars, brands, carModels, filters }) {
    // Estados locales para el buscador
    const [selectedBrand, setSelectedBrand] = useState(filters.brand_id || "");
    const [selectedModel, setSelectedModel] = useState(filters.model_id || "");
    const [selectedCondition, setSelectedCondition] = useState(
        filters.condition || "",
    ); // <-- NUEVO ESTADO

    const [filteredModels, setFilteredModels] = useState([]);

    useEffect(() => {
        if (selectedBrand) {
            const modelsOfBrand = carModels.filter(
                (model) =>
                    model.brand_id.toString() === selectedBrand.toString(),
            );
            setFilteredModels(modelsOfBrand);

            const modelExistsInBrand = modelsOfBrand.some(
                (m) => m.id.toString() === selectedModel.toString(),
            );
            if (!modelExistsInBrand) {
                setSelectedModel("");
            }
        } else {
            setFilteredModels([]);
            setSelectedModel("");
        }
    }, [selectedBrand, carModels]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("catalog"),
            {
                brand_id: selectedBrand,
                model_id: selectedModel,
                condition: selectedCondition, // <-- Lo enviamos al servidor
            },
            { preserveState: true },
        );
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
        }).format(price || 0);
    };

    return (
        <PublicLayout>
            <Head title="Catálogo de Vehículos" />

            <div className="bg-taller-navy text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="font-montserrat font-bold text-4xl mb-4">
                        Catálogo de Vehículos
                    </h1>
                    <p className="text-xl font-light text-gray-300">
                        Encuentra tu próximo coche garantizado por nuestros
                        expertos.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
                {/* BARRA LATERAL: Filtros */}
                <aside className="w-full md:w-1/4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                        <h2 className="font-montserrat font-bold text-xl text-taller-anthracite mb-6 border-b pb-2">
                            Filtros
                        </h2>

                        <form onSubmit={handleSearch} className="space-y-6">
                            {/* Filtro: Estado / Condición */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Estado del Vehículo
                                </label>
                                <select
                                    value={selectedCondition}
                                    onChange={(e) =>
                                        setSelectedCondition(e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-taller-accent focus:border-taller-accent bg-gray-50 font-medium text-taller-navy"
                                >
                                    <option value="">Todos los estados</option>
                                    <option value="Nuevo">Nuevos</option>
                                    {/* Ajusta "SegundaMano" si en tu BBDD se llama "Usado" u "Ocasión" */}
                                    <option value="SegundaMano">
                                        SegundaMano
                                    </option>
                                </select>
                            </div>

                            {/* Filtro: Marca */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Marca
                                </label>
                                <select
                                    value={selectedBrand}
                                    onChange={(e) =>
                                        setSelectedBrand(e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-taller-accent focus:border-taller-accent"
                                >
                                    <option value="">Todas las marcas</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtro: Modelo */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Modelo
                                </label>
                                <select
                                    value={selectedModel}
                                    onChange={(e) =>
                                        setSelectedModel(e.target.value)
                                    }
                                    disabled={!selectedBrand}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-taller-accent focus:border-taller-accent disabled:bg-gray-100 disabled:text-gray-400"
                                >
                                    <option value="">Todos los modelos</option>
                                    {filteredModels.map((model) => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                                </select>
                                {!selectedBrand && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        Selecciona una marca primero
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-taller-accent hover:bg-taller-accentHover text-white font-bold py-3 px-4 rounded transition shadow"
                            >
                                Buscar Vehículos
                            </button>

                            {/* Limpiar filtros */}
                            {(selectedBrand ||
                                selectedModel ||
                                selectedCondition) && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedBrand("");
                                        setSelectedModel("");
                                        setSelectedCondition("");
                                        router.get(route("catalog"));
                                    }}
                                    className="w-full mt-2 text-sm text-gray-500 hover:text-gray-800 underline text-center"
                                >
                                    Limpiar filtros
                                </button>
                            )}
                        </form>
                    </div>
                </aside>

                {/* ÁREA PRINCIPAL */}
                <div className="w-full md:w-3/4">
                    <div className="mb-4 text-gray-600 font-medium">
                        Mostrando {cars.total} vehículos disponibles
                    </div>

                    {cars.data.length === 0 ? (
                        <div className="bg-white p-10 rounded-lg shadow-sm text-center border border-gray-200">
                            <p className="text-gray-500 text-lg">
                                No hemos encontrado ningún vehículo con esos
                                filtros.
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedBrand("");
                                    setSelectedModel("");
                                    setSelectedCondition("");
                                    router.get(route("catalog"));
                                }}
                                className="mt-4 text-taller-accent font-bold hover:underline"
                            >
                                Ver todo el catálogo
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cars.data.map((car) => (
                                <div
                                    key={car.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition flex flex-col group"
                                >
                                    {/* Imagen y Etiqueta de Estado */}
                                    <div className="h-48 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                                        {car.image_path ? (
                                            <img
                                                src={`/storage/${car.image_path}`}
                                                alt="Coche"
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        ) : (
                                            <span className="text-gray-400 font-medium">
                                                Sin foto
                                            </span>
                                        )}

                                        {/* Etiqueta Visual Dinámica: Nuevo vs SegundaMano */}
                                        <div
                                            className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded shadow-sm uppercase ${car.condition === "Nuevo" ? "bg-green-600" : "bg-taller-accent"}`}
                                        >
                                            {car.condition || "Ocasión"}
                                        </div>
                                    </div>

                                    {/* Contenido Tarjeta */}
                                    <div className="p-5 flex-grow flex flex-col">
                                        <h3 className="font-montserrat font-bold text-lg text-taller-anthracite mb-1 leading-tight">
                                            {car.car_model.brand.name}{" "}
                                            {car.car_model.name}
                                        </h3>
                                        <div className="text-sm text-gray-500 mb-4 flex-grow">
                                            <p>
                                                {car.mileage || "0"} km •{" "}
                                                {car.fuel_type ||
                                                    "Diésel/Gasolina"}{" "}
                                                • {car.year || "N/D"}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center mt-auto border-t pt-4">
                                            <span className="font-bold text-xl text-taller-accent">
                                                {formatPrice(car.price || 0)}
                                            </span>
                                            <Link
                                                href={route(
                                                    "catalog.show",
                                                    car.id,
                                                )}
                                                className="text-sm bg-taller-anthracite hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition"
                                            >
                                                Ver Detalles
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-8 flex justify-center">
                        <div className="flex flex-wrap gap-1">
                            {cars.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`px-4 py-2 border rounded text-sm ${
                                        link.active
                                            ? "bg-taller-navy text-white font-bold border-taller-navy"
                                            : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                                    } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
