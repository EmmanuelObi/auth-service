/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      colors: {
        "page-grey": "#667085",
        primary: "#101828",
        label: "#344054",
        "border-input": "#D0D5DD",
        "button-blue": "#001F3F",
      },
    },
  },
  plugins: [],
};
