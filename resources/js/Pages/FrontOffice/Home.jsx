import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";

export default function Home({auth, featuredCars }) {
    // Formateador de precio
    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
        }).format(price || 0);
    };

    return (
        <PublicLayout>
            <Head title="Inicio - Taller y Vehículos de Ocasión" />

            {/* HERO SECTION (Cabecera principal) */}
            <div className="bg-taller-navy text-white py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
                        Tu coche en las{" "}
                        <span className="text-taller-accent">
                            mejores manos
                        </span>
                    </h1>
                    {/* 2. Indicativo de sesión */}
                    {auth.user ? (
                        <div className="mb-8">
                            <p className="text-lg text-taller-accent font-semibold">
                                ¡Hola, {auth.user.name}!
                            </p>
                            <Link
                                href={route("admin.dashboard")}
                                className="text-white hover:underline"
                            >
                                Ir a mi panel de gestión &rarr;
                            </Link>
                        </div>
                    ) : (
                        <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto mb-10 font-light">
                            Especialistas en mecánica multimarca, chapa, pintura
                            y venta de vehículos de ocasión estrictamente
                            revisados y con garantía total.
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href={route("catalog")}
                            className="bg-taller-accent hover:bg-taller-accentHover text-white font-bold py-3 px-8 rounded shadow-lg transition text-lg"
                        >
                            Ver Coches en Venta
                        </Link>

                        {/* 3. Cambiamos el botón dinámicamente */}
                        {!auth.user && (
                            <Link
                                href={route("login")}
                                className="bg-transparent border-2 border-white hover:bg-white hover:text-taller-navy text-white font-bold py-3 px-8 rounded shadow-lg transition text-lg"
                            >
                                Área de Clientes
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* SECCIÓN: Servicios del Taller */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-montserrat font-bold text-3xl text-taller-anthracite">
                            Nuestros Servicios
                        </h2>
                        <div className="w-24 h-1 bg-taller-accent mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-gray-50 rounded-xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-taller-navy"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="font-montserrat font-bold text-xl mb-3 text-taller-navy">
                                Mecánica General
                            </h3>
                            <p className="text-gray-600">
                                Revisiones, mantenimientos, diagnosis avanzada y
                                reparación de motores con piezas originales.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-taller-accent"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="font-montserrat font-bold text-xl mb-3 text-taller-navy">
                                Chapa y Pintura
                            </h3>
                            <p className="text-gray-600">
                                Devolvemos el brillo a tu vehículo. Trabajamos
                                con todas las aseguradoras del mercado.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="font-montserrat font-bold text-xl mb-3 text-taller-navy">
                                Compra / Venta
                            </h3>
                            <p className="text-gray-600">
                                Vehículos de ocasión garantizados. Compramos tu
                                coche antiguo y financiamos tu nueva
                                adquisición.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECCIÓN: Vehículos Destacados */}
            <div className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="font-montserrat font-bold text-3xl text-taller-anthracite">
                                Recién Llegados
                            </h2>
                            <div className="w-24 h-1 bg-taller-accent mt-4"></div>
                        </div>
                        <Link
                            href={route("catalog")}
                            className="hidden sm:block text-taller-navy font-bold hover:underline"
                        >
                            Ver todo el catálogo &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCars.length === 0 ? (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-500">
                                    Aún no hay vehículos destacados disponibles.
                                </p>
                            </div>
                        ) : (
                            featuredCars.map((car) => (
                                <div
                                    key={car.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition flex flex-col group"
                                >
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
                                        <div
                                            className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded shadow-sm uppercase ${car.condition === "Nuevo" ? "bg-green-600" : "bg-taller-accent"}`}
                                        >
                                            {car.condition || "Ocasión"}
                                        </div>
                                    </div>
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
                            ))
                        )}
                    </div>

                    {/* Botón para móviles */}
                    <div className="mt-8 text-center sm:hidden">
                        <Link
                            href={route("catalog")}
                            className="inline-block bg-taller-navy text-white font-bold py-3 px-6 rounded w-full"
                        >
                            Ver todo el catálogo
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
