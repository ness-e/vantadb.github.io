/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        vanta: {
          orange: '#FF6A00',
          crimson: '#DC143C',
          gold: '#FFB703',
          space: '#0D0D0F',
          surface: '#1A1A1F',
          steel: '#2C2F36',
          frost: '#E6E6E6',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #FF6A00 0%, #FFB703 100%)',
        'gradient-fire': 'linear-gradient(135deg, #DC143C 0%, #FF6A00 50%, #FFB703 100%)',
      },
    },
  },
  plugins: [],
};
