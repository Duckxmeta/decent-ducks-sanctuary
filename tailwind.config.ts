import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Sanctuary Branding
        sanctuary: {
          green: '#1B3022',   // Deep Forest Green
          cream: '#F9F6EE',   // Soft Cream (Page Background)
          gold: '#FFCC00',    // Your Decent Ducks Yellow/Gold
          dark: '#1A1A1A',    // Deep Dark (for text/headers)
          accent: '#D4AF37',  // Metallic Gold (for borders/buttons)
        },
      },
      fontFamily: {
        // If you want to use serif fonts for that "Elite" feel
        serif: ['ui-serif', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
