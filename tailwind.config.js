/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    purple: '#667eea',
                    deep: '#764ba2',
                },
                accent: {
                    blue: '#4facfe',
                    cyan: '#00f2fe',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'Inter', 'sans-serif'],
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'secondary-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'accent-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'dark-gradient': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            },
            animation: {
                'float': 'float 8s ease-in-out infinite',
                'particle-float': 'particleFloat 15s infinite ease-in-out',
                'icon-pulse': 'iconPulse 3s ease-in-out infinite',
            },
            boxShadow: {
                'card': '0 20px 60px rgba(102, 126, 234, 0.15)',
                'card-hover': '0 30px 80px rgba(102, 126, 234, 0.25)',
            },
        },
    },
    plugins: [],
}
