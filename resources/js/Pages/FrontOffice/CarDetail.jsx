import PublicLayout from "@/Layouts/PublicLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CarDetail({ car }) {
    // Inicializamos el formulario de contacto usando Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        car_id: car.id,
        name: "",
        email: "",
        phone: "",
        message: `Hola, estoy interesado en el ${car.car_model.brand.name} ${car.car_model.name} y me gustaría recibir más información.`,
    });

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
        }).format(price || 0);
    };

    const [formSuccess, setFormSuccess] = useState(false);

    const submitContact = (e) => {
        e.preventDefault();
        post(route("public.contact.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setFormSuccess(true);
                setTimeout(() => setFormSuccess(false), 5000);
            },
        });
    };

    return (
        <PublicLayout>
            <Head
                title={`${car.car_model.brand.name} ${car.car_model.name} - Ocasión`}
            />

            {/* Cabecera del Vehículo */}
            <div className="bg-taller-anthracite text-white py-10 border-b-4 border-taller-accent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h1 className="font-montserrat font-extrabold text-3xl md:text-5xl uppercase tracking-tight">
                            {car.car_model.brand.name}{" "}
                            <span className="text-taller-accent">
                                {car.car_model.name}
                            </span>
                        </h1>
                        <p className="text-gray-400 mt-2 text-lg">
                            Estado:{" "}
                            <span className="text-white font-medium capitalize">
                                {car.condition || "Ocasión"}
                            </span>
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0 text-right">
                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">
                            Precio al contado
                        </p>
                        <p className="font-montserrat font-bold text-4xl text-white">
                            {formatPrice(car.price)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">
                {/* COLUMNA IZQUIERDA: Fotos y Detalles Técnicos */}
                <div className="w-full lg:w-2/3 space-y-10">
                    {/* Galería / Imagen Principal */}
                    <div className="bg-gray-200 rounded-xl overflow-hidden aspect-video flex items-center justify-center border border-gray-300 shadow-inner relative">
                        {car.image_path ? (
                            <img
                                src={`/storage/${car.image_path}`}
                                alt="Vehículo"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-center text-gray-400">
                                <svg
                                    className="mx-auto h-16 w-16 mb-4 opacity-50"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="text-xl font-medium tracking-wide">
                                    Imágenes en preparación
                                </span>
                            </div>
                        )}
                        {/* Etiqueta Visual */}
                        <div className="absolute top-4 left-4 bg-taller-accent text-white font-bold py-1 px-4 rounded shadow-md uppercase tracking-wider text-sm">
                            Garantía Taller Paco
                        </div>
                    </div>

                    {/* Especificaciones Técnicas */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h2 className="font-montserrat font-bold text-2xl text-taller-navy mb-6 border-b pb-2">
                            Especificaciones
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                                    Año
                                </p>
                                <p className="font-bold text-gray-800 text-lg">
                                    {car.year || "N/D"}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                                    Kilómetros
                                </p>
                                <p className="font-bold text-gray-800 text-lg">
                                    {car.mileage ? `${car.mileage} km` : "N/D"}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                                    Combustible
                                </p>
                                <p className="font-bold text-gray-800 text-lg capitalize">
                                    {car.fuel_type || "N/D"}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                                    Estado Ficha
                                </p>
                                <p className="font-bold text-gray-800 text-lg capitalize text-green-600">
                                    {car.status || "Disponible"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Descripción del Taller */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h2 className="font-montserrat font-bold text-2xl text-taller-navy mb-4 border-b pb-2">
                            Descripción del Vehículo
                        </h2>
                        <div className="prose text-gray-600 leading-relaxed whitespace-pre-line">
                            {car.description
                                ? car.description
                                : "Este vehículo ha sido revisado en más de 100 puntos críticos por nuestros mecánicos profesionales en Taller Paco. Se entrega con mantenimiento al día, limpieza integral y garantía mecánica para su total tranquilidad."}
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Formulario de Contacto (Sticky) */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-white rounded-xl shadow-lg border-t-4 border-taller-accent p-8 sticky top-28">
                        <h3 className="font-montserrat font-bold text-2xl text-taller-anthracite mb-2">
                            ¿Te interesa?
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Déjanos tus datos y un comercial de Taller Paco te
                            contactará lo antes posible.
                        </p>

                        <form onSubmit={submitContact} className="space-y-4">
                            {formSuccess && (
                                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                                    <strong className="font-bold">
                                        ¡Mensaje enviado!{" "}
                                    </strong>
                                    <span className="block sm:inline">
                                        Nos pondremos en contacto contigo lo
                                        antes posible.
                                    </span>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    className="w-full border-gray-300 rounded focus:ring-taller-navy focus:border-taller-navy bg-gray-50"
                                    placeholder="Ej: Juan Pérez"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    required
                                    className="w-full border-gray-300 rounded focus:ring-taller-navy focus:border-taller-navy bg-gray-50"
                                    placeholder="Ej: 600 123 456"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    className="w-full border-gray-300 rounded focus:ring-taller-navy focus:border-taller-navy bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mensaje
                                </label>
                                <textarea
                                    value={data.message}
                                    onChange={(e) =>
                                        setData("message", e.target.value)
                                    }
                                    rows="4"
                                    required
                                    className="w-full border-gray-300 rounded focus:ring-taller-navy focus:border-taller-navy bg-gray-50 text-sm"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-taller-navy hover:bg-blue-900 text-white font-bold py-3 px-4 rounded transition shadow-md mt-4 flex justify-center items-center gap-2"
                            >
                                <span>Solicitar Información</span>
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    ></path>
                                </svg>
                            </button>
                            <p className="text-xs text-center text-gray-400 mt-3">
                                Tus datos están seguros y protegidos.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
