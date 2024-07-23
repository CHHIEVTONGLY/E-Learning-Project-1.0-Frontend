/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Roboto: "Roboto",
      Helvetica: "Helvetica",
    },
    extend: {
      fontSize: {
        larger: "1.2rem",
        title : "2rem" 
      },
      borderWidth: {
        _1px: "1px",
      },
      width:{
        _larger : "45rem"
      },
    },
  },
  plugins: [],
};
