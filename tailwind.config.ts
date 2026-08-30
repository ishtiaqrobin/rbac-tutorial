/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['media'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kalam: ['var(--font-kalam)', 'cursive', 'sans-serif'],
        sans: ['var(--font-kalam)', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        'doodle': '3px 3px 0px 0px #000',
        'doodle-sm': '2px 2px 0px 0px #000',
        'doodle-lg': '5px 5px 0px 0px #000',
      },
      colors: {
        cream: '#fdfbf7',
        brandYellow: '#f3b72b',
        brandRed: '#e05252',
        darkBlack: '#1a1a1a',
        /* ShadcnUI color tokens — map CSS variables to Tailwind classes */
        border:           "hsl(var(--border))",
        input:            "hsl(var(--input))",
        ring:             "hsl(var(--ring))",
        background:       "hsl(var(--background))",
        foreground:       "hsl(var(--foreground))",
        card: {
          DEFAULT:        "hsl(var(--card))",
          foreground:     "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT:        "hsl(var(--popover))",
          foreground:     "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT:        "hsl(var(--primary))",
          foreground:     "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:        "hsl(var(--secondary))",
          foreground:     "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:        "hsl(var(--muted))",
          foreground:     "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:        "hsl(var(--accent))",
          foreground:     "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT:        "hsl(0 84.3% 61.2%)",
          foreground:     "hsl(0 0% 100%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
