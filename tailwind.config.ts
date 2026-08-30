/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['media'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ShadcnUI color tokens — map CSS variables to Tailwind classes
           so components can use utility classes like `bg-card`, `text-foreground` */
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
