import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        greyCustom01: "#EEEEEE",
        textPrimary: "#6A6A6A",
        textSecondary: "#505050",
        textDescription: "#8B8B8B",
        bg01: "#FAFAFA",
        primary: "#1677FF",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          // Class name
          customCol: (value) => {
            return {
              flex: `0 0 ${value}`, // Desired CSS properties here
            };
          },
        },
        // Default values.
        // `flattenColorPalette` required to support native Tailwind color classes like `red-500`, `amber-300`, etc.
        // In most cases you may just pass `theme('config-key')`, where `config-key` could be any (`spacing`, `fontFamily`, `foo`, `bar`)
        { values: "auto" },
      );
    }),
  ],
  corePlugins: {
    preflight: true,
  },
};
