/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: 'var(--color-app-bg)',
          surface: 'var(--color-app-surface)',
          secondary: 'var(--color-app-secondary)',
        },
        brand: {
          navy: 'var(--color-brand-primary)',
          indigo: '#10B981',         // Fresh Vibrant Emerald Green as primary action
          indigoHover: '#059669',    // Darker Green hover
          softIndigo: 'var(--color-brand-soft-green)',
          teal: '#059669',
          softTeal: 'var(--color-brand-soft-green)',
          accentRed: '#EF4444',      // Crisp Signal Red accent
          accentRedHover: '#DC2626',
          softRed: 'var(--color-brand-soft-red)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        border: {
          light: 'var(--color-border-light)',
          strong: 'var(--color-border-strong)',
        },
        semantic: {
          success: '#10B981',
          successBg: 'var(--color-semantic-success-bg)',
          warning: '#F59E0B',
          warningBg: 'var(--color-semantic-warning-bg)',
          danger: '#EF4444',
          dangerBg: 'var(--color-semantic-danger-bg)',
          info: '#10B981',
          infoBg: 'var(--color-semantic-success-bg)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        cardHover: 'var(--shadow-card-hover)',
        modal: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
