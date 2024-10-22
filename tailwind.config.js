/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      student: "#E7DFD8",
      supervisor: "#D7FFFA",
      primary: "#38B6FF",
      secondary: "#004AAD",
      confirm: "#00BF63",
      cancel: "#FF5757",
    },
  },
  plugins: [],
};
