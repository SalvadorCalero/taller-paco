import PublicLayout from "@/Layouts/PublicLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Contact() {
    const [formSuccess, setFormSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        phone: "",
        email: "",
        reason: "Información general",
        license_plate: "",
        requested_date: "",
        message: "",
    });

    const submitAppointment = (e) => {
        e.preventDefault();

        // Creamos un objeto de envío limpio
        const payload = { ...data };

        // Si no es cita previa, limpiamos los campos para no enviar basura
        if (data.reason !== "Pedir cita previa (Taller)") {
            payload.license_plate = "";
            payload.requested_date = "";
        }

        post(route("public.appointment.store"), {
            data: payload, // Enviamos el objeto limpio
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
            <Head title="Contacto y Cita Previa - Taller Paco" />

            <div className="bg-taller-navy text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="font-montserrat font-bold text-4xl mb-4">
                        Contacta con nosotros
                    </h1>
                    <p className="text-xl font-light text-gray-300">
                        Resuelve tus dudas o solicita tu cita de taller online.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Información del Taller */}
                    <div className="space-y-6">
                        <h2 className="font-montserrat font-bold text-2xl text-taller-anthracite mb-6">
                            Información del Taller
                        </h2>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full text-taller-navy">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Ubicación
                                </h3>
                                <p className="text-gray-600 mt-1">
                                    Polígono Industrial Los Motores, Nave 4
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full text-taller-navy">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Teléfono
                                </h3>
                                <p className="text-gray-600 mt-1">
                                    +34 900 123 456
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                            <h3 className="font-montserrat font-bold text-lg text-taller-anthracite mb-4">
                                Horario de Apertura
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex justify-between border-b pb-2">
                                    <span>Lunes a Viernes</span>
                                    <span>09:00 - 14:00 | 16:00 - 19:30</span>
                                </li>
                                <li className="flex justify-between border-b pb-2">
                                    <span>Sábados</span>
                                    <span>10:00 - 13:30</span>
                                </li>
                                <li className="flex justify-between text-taller-accent font-bold">
                                    <span>Domingos</span>
                                    <span>Cerrado</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-taller-accent">
                        <h2 className="font-montserrat font-bold text-2xl text-taller-anthracite mb-2">
                            Solicitud de Servicio
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Rellena los datos y gestionaremos tu petición al
                            instante.
                        </p>

                        {formSuccess && (
                            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                <strong className="font-bold">
                                    ¡Solicitud registrada!{" "}
                                </strong>{" "}
                                El taller revisará tu propuesta de cita.
                            </div>
                        )}

                        <form
                            className="space-y-4"
                            onSubmit={submitAppointment}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full border-gray-300 rounded text-sm bg-gray-50"
                                    />
                                    {errors.name && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                        Teléfono *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        className="w-full border-gray-300 rounded text-sm bg-gray-50"
                                    />
                                    {errors.phone && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.phone}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded text-sm bg-gray-50"
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                    Motivo de la consulta *
                                </label>
                                <select
                                    value={data.reason}
                                    onChange={(e) =>
                                        setData("reason", e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded text-sm bg-gray-50 font-semibold text-taller-navy"
                                >
                                    <option value="Información general">
                                        Información general
                                    </option>
                                    <option value="Pedir cita previa (Taller)">
                                        Pedir cita previa (Taller)
                                    </option>
                                    <option value="Consulta sobre Vehículo Ocasión">
                                        Consulta sobre Vehículo Ocasión
                                    </option>
                                </select>
                            </div>

                            {/* Campos condicionales si el usuario quiere pedir Cita en el Taller */}
                            {data.reason === "Pedir cita previa (Taller)" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-blue-50 rounded border border-blue-100 animate-fadeIn">
                                    <div>
                                        <label className="block text-xs font-bold text-blue-900 uppercase mb-1">
                                            Matrícula (Opcional)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ej: 1234BBB"
                                            value={data.license_plate}
                                            onChange={(e) =>
                                                setData(
                                                    "license_plate",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full border-blue-300 rounded text-sm uppercase font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-blue-900 uppercase mb-1">
                                            Fecha y Hora Propuesta *
                                        </label>
                                        <input
                                            type="datetime-local"
                                            required={
                                                data.reason ===
                                                "Pedir cita previa (Taller)"
                                            }
                                            value={data.requested_date}
                                            onChange={(e) =>
                                                setData(
                                                    "requested_date",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full border-blue-300 rounded text-sm font-mono"
                                        />
                                        {errors.requested_date && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.requested_date}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                    Descripción / Notas adicionales
                                </label>
                                <textarea
                                    rows="4"
                                    value={data.message}
                                    onChange={(e) =>
                                        setData("message", e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded text-sm bg-gray-50"
                                    placeholder="Describe brevemente qué le ocurre al coche o cuál es tu consulta..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-taller-navy hover:bg-blue-900 text-white font-bold py-3 px-4 rounded transition shadow-md disabled:opacity-50"
                            >
                                Enviar Solicitud
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
