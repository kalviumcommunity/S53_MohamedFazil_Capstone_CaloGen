/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#147D0B",
      },
      borderRadius: {
        "3xl": "20px",
      },
      borderWidth: {
        3: "3.5px",
      },
    },
  },
  plugins: [],
};
