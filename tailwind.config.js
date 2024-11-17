/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                'medium-desktop': '1366px',
            },
            colors: {
                menuBg: 'var(--menu-bg-color)',
                menuText: 'var(--menu-color)',
                headerText: 'var(--text-color)',
                textBase: 'var(--text-base-color)',
                brand: {
                    primary: '#092C4C',
                    secondary: '#DF1B21',
                },
                state: {
                    info: '#3E5BE0',
                    success: '#27AE60',
                    warning: '#E67E22',
                    error: '#E74C3C',
                },
                blackColor: {
                    first: '#000000',
                    second: '#1D1D1D',
                    third: '#282828',
                },
                greyColor: {
                    first: '#333333',
                    second: '#4F4F4F',
                    third: '#828282',
                    fourth: '#BDBDBD',
                    fifth: '#E0E0E0',
                },
                supportColor: {
                    first: '#1ABC9C',
                    second: '#2ECC71',
                    third: '#3498DB',
                    fourth: '#9B59B6',
                    fifth: '#433CCC',
                    sixth: '#576574',
                    seventh: '#F1C40F',
                    eighth: '#C1DA6C',
                },
            },
            fontSize: {
                h1: [
                    '3.5rem',
                    {
                        lineHeight: '3.85rem',
                    },
                ],
                h2: [
                    '3rem',
                    {
                        lineHeight: '3.3rem',
                    },
                ],
                h3: [
                    '2.5rem',
                    {
                        lineHeight: '2.75rem',
                    },
                ],
                h4: [
                    '2rem',
                    {
                        lineHeight: '2.2rem',
                    },
                ],
                h5: [
                    '1.5rem',
                    {
                        lineHeight: '1.65rem',
                    },
                ],
                h6: [
                    '1.25rem',
                    {
                        lineHeight: '1.375rem',
                    },
                ],
                sm: [
                    '0.875rem',
                    {
                        lineHeight: '1.225rem',
                    },
                ],
                normal: [
                    '1rem',
                    {
                        lineHeight: '1.4rem',
                    },
                ],
                md: [
                    '1.125rem',
                    {
                        lineHeight: '1.575rem',
                    },
                ],
                lg: [
                    '1.25rem',
                    {
                        lineHeight: '1.75rem',
                    },
                ],
            },
        },
    },
    plugins: [
        // eslint-disable-next-line no-undef
        require('@tailwindcss/typography'),
        function ({ addUtilities }) {
            const newUtilities = {
                /* Hide scrollbar for Chrome, Safari and Opera */
                '.no-scrollbar::-webkit-scrollbar': {
                    display: 'none',
                },

                /* Hide scrollbar for IE, Edge and Firefox */
                '.no-scrollbar': {
                    '-ms-overflow-style': 'none' /* IE and Edge */,
                    'scrollbar-width': 'none' /* Firefox */,
                },

                // Vertical text
                '.vertical-rl': {
                    writingMode: 'vertical-rl',
                },
            };

            addUtilities(newUtilities);
        },
    ],
    corePlugins: {
        preflight: false,
    },
};
