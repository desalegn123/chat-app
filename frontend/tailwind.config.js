/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      "light",
      "dark",
      "retro",
      "cyberpunk",
      "dracula",
      "minimal",
      "luxury",
      "forest",
      "aqua",
      "sunset",
      "neon",
      "pastel",
      "vintage",
      "hacker",
      "space",
      "ocean",
      "earthy",
      "matrix",
      "futuristic",
      "golden",
      "royal",
      "grayscale",
      "contrast",
      "midnight",
      "coffee",
      "nordic",
      "autumn",
      "warm",
      "cold",
      "bubblegum",
      "berry",
      "velvet",
    ],
  },
 
}

