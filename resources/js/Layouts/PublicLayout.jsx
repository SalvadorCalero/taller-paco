import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function PublicLayout({ children }) {
    // Estado para controlar si el menú móvil está abierto o cerrado
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            
            {/* BARRA DE NAVEGACIÓN */}
            <header className="bg-taller-navy text-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="font-montserrat font-extrabold text-2xl tracking-wider flex items-center gap-2">
                                <span className="text-taller-accent">TALLER</span>
                                <span>PACO</span>
                            </Link>
                        </div>

                        {/* Menú Desktop (Oculto en móviles) */}
                        <nav className="hidden md:flex space-x-8">
                            <Link href="/" className="text-gray-200 hover:text-taller-accent font-semibold transition">
                                Inicio
                            </Link>
                            <Link href="/vehiculos" className="text-gray-200 hover:text-taller-accent font-semibold transition">
                                Catálogo de Vehículos
                            </Link>
                            <Link href="/contacto" className="text-gray-200 hover:text-taller-accent font-semibold transition">
                                Contacto
                            </Link>
                        </nav>

                        {/* Botón de Área Clientes (Desktop) */}
                        <div className="hidden md:flex items-center">
                            <Link 
                                href={route('login')} 
                                className="bg-transparent border-2 border-taller-accent text-taller-accent hover:bg-taller-accent hover:text-white font-bold py-2 px-6 rounded-full transition"
                            >
                                Área Taller
                            </Link>
                        </div>

                        {/* Botón de Hamburguesa (Móviles) */}
                        <div className="-mr-2 flex items-center md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-900 focus:outline-none transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* MENÚ DESPLEGABLE (Solo visible en Móviles) */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden bg-taller-navy border-t border-blue-800'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-300 hover:text-white hover:bg-blue-900 hover:border-taller-accent">
                            Inicio
                        </Link>
                        <Link href="/vehiculos" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-300 hover:text-white hover:bg-blue-900 hover:border-taller-accent">
                            Catálogo de Vehículos
                        </Link>
                        <Link href="/contacto" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-300 hover:text-white hover:bg-blue-900 hover:border-taller-accent">
                            Contacto
                        </Link>
                        <div className="border-t border-blue-800 mt-2 pt-2">
                            <Link href={route('login')} className="block pl-3 pr-4 py-2 text-base font-bold text-taller-accent hover:text-white hover:bg-blue-900">
                                Acceso Área Taller
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-grow">
                {children}
            </main>

            {/* PIE DE PÁGINA */}
            <footer className="bg-taller-anthracite text-gray-300 py-10 mt-12 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-montserrat font-bold text-xl text-white mb-4">TALLER PACO</h3>
                        <p className="text-sm">Especialistas en reparación multimarcas y venta de vehículos de ocasión revisados y garantizados.</p>
                    </div>
                    <div>
                        <h3 className="font-montserrat font-bold text-lg text-white mb-4">Horario</h3>
                        <ul className="text-sm space-y-2">
                            <li>Lunes a Viernes: 09:00 - 14:00 | 16:00 - 19:30</li>
                            <li>Sábados: 10:00 - 13:30</li>
                            <li>Domingos: Cerrado</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-montserrat font-bold text-lg text-white mb-4">Contacto</h3>
                        <ul className="text-sm space-y-2">
                            <li>Teléfono: +34 900 123 456</li>
                            <li>Email: info@tallerpaco.com</li>
                            <li>Dirección: Polígono Industrial, Nave 4</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-xs text-gray-500 mt-8 border-t border-gray-600 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    &copy; {new Date().getFullYear()} Taller Paco. Todos los derechos reservados.
                </div>
            </footer>

        </div>
    );
}