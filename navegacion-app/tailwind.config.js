/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#49129c",
        secondary: {
          DEFAULT: "#b40086",
          100: "#c51297",
          200: "#831266",
        },
        tertiary: "#ef2967",
      },
      fontFamily: {
        "work-black": ["WorkSans-Black"],
        "work-light": ["WorkSans-Light"],
        "work-medium": ["WorkSans-MediumItalic"],
      },
    },
  },
  plugins: [],
};
