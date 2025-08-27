/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",   // custom blue
        secondary: "#F59E0B", // amber
        danger: "#DC2626",    // red
        success: "#16A34A",   // green
      },
    },
  },
  plugins: [],
}
