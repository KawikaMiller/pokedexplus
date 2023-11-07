/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        pkRed: `rgb(213, 25, 25)`,
        bug: `#A8B820`,
        dark: `#705848`,
        dragon: `#7038F8`,
        electric: `#F8D030`,
        fairy: `#EE99AC`,
        fighting: `#C03028`,
        fire: `#F08030`,
        flying: `#A890F0`,
        ghost: `#705898`,
        grass: `#78C850`,
        ground: `#E0C068`,
        ice: `#98D8D8`,
        normal: `#A8A878`,
        poison: `#A040A0`,
        psychic: `#F85888`,
        rock: `#B8A038`,
        steel: `#B8B8D0`,
        water: `#6890F0`,
      }
    },
  },
  plugins: [],
}
