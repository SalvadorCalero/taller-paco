import PublicLayout from "@/Layouts/PublicLayout";
import { Head } from "@inertiajs/react";

export default function Contact() {
    return (
        <PublicLayout>
            <Head title="Contacto - Taller Paco" />

            {/* Cabecera */}
            <div className="bg-taller-navy text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="font-montserrat font-bold text-4xl mb-4">Contacta con nosotros</h1>
                    <p className="text-xl font-light text-gray-300">Estamos aquí para resolver tus dudas y cuidar de tu vehículo.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* Columna Izquierda: Información de contacto y horarios */}
                    <div>
                        <h2 className="font-montserrat font-bold text-2xl text-taller-anthracite mb-6">Información del Taller</h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-taller-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold text-gray-900">Ubicación</h3>
                                    <p className="text-gray-600 mt-1">Polígono Industrial Los Motores<br/>Nave 4, Calle Principal<br/>28000, Madrid</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-taller-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold text-gray-900">Teléfono</h3>
                                    <p className="text-gray-600 mt-1">+34 900 123 456</p>
                                    <p className="text-sm text-gray-500">Atención telefónica en horario laboral</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-taller-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold text-gray-900">Email</h3>
                                    <p className="text-gray-600 mt-1">info@tallerpaco.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="font-montserrat font-bold text-xl text-taller-anthracite mb-4">Horario de Apertura</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="font-medium">Lunes a Viernes</span>
                                    <span>09:00 - 14:00 | 16:00 - 19:30</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="font-medium">Sábados</span>
                                    <span>10:00 - 13:30</span>
                                </li>
                                <li className="flex justify-between text-taller-accent font-bold">
                                    <span>Domingos y Festivos</span>
                                    <span>Cerrado</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario General */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-taller-accent">
                        <h2 className="font-montserrat font-bold text-2xl text-taller-anthracite mb-2">Envíanos un mensaje</h2>
                        <p className="text-sm text-gray-500 mb-6">Completa el formulario y te responderemos a la mayor brevedad posible.</p>
                        
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Mensaje genérico enviado al taller."); }}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                                <input type="text" required className="w-full border-gray-300 rounded focus:ring-taller-navy focus:border-taller-navy bg-gray-50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input type="tel" required className="w-full border-gray-300 rounded focus:ring-taller-navy focus:border-taller-navy bg-gray-50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" required className="w-full border-gray-300 rounded focus:ring-taller-navy focus:border-taller-navy bg-gray-50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Motivo de la consulta</label>
                                <select className="w-full border-gray-300 rounded focus:ring-taller-navy focus:border-taller-navy bg-gray-50">
                                    <option>Información general</option>
                                    <option>Pedir cita previa (Taller)</option>
                                    <option>Vehículos de ocasión</option>
                                    <option>Otro</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tu Mensaje</label>
                                <textarea rows="4" required className="w-full border-gray-300 rounded focus:ring-taller-navy focus:border-taller-navy bg-gray-50"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-taller-navy hover:bg-blue-900 text-white font-bold py-3 px-4 rounded transition shadow-md mt-4">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}