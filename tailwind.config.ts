import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Museum dark theme
        'museum-bg': '#0a0e27',
        'museum-card': '#0f1438',
        'museum-border': '#1a2555',
        'museum-accent': '#3b82f6',
        'museum-muted': '#64748b',
        'museum-highlight': '#60a5fa',
        'museum-text': '#e2e8f0',
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'museum': '0 20px 60px rgba(0, 0, 0, 0.5)',
        'museum-sm': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'museum-glow': '0 0 30px rgba(59, 130, 246, 0.1)',
      },
      backgroundImage: {
        'gradient-museum': 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
