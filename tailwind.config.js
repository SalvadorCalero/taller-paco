import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                // Añadimos Montserrat
                montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans], 
            },
            colors: {
                // Paleta corporativa de TallerPaco
                taller: {
                    navy: '#1E3A8A',       // Azul Marino clásico
                    anthracite: '#374151', // Gris oscuro / Antracita
                    accent: '#EA580C',     // Naranja vibrante
                    accentHover: '#C2410C' // Naranja oscuro para hover
                }
            }
        },
    },

    plugins: [forms],
};