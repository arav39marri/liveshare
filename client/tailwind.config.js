/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070B14',
        surface: '#0D1117',
        card: '#111827',
        border: '#1F2937',
        accent: {
          primary: '#6366F1', // indigo
          secondary: '#8B5CF6', // violet
          glow: '#4F46E5',
        },
        text: {
          primary: '#F9FAFB',
          secondary: '#9CA3AF',
          muted: '#4B5563',
        },
        success: '#10B981',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
}
