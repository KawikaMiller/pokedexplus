/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens:{
        'xxs': '375px',
        'xs': '500px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        pkRed: `rgb(213, 25, 25)`,
        Bug: `#A8B820`,
        Dark: `#705848`,
        Dragon: `#7038F8`,
        Electric: `#F8D030`,
        Fairy: `#EE99AC`,
        Fighting: `#C03028`,
        Fire: `#F08030`,
        Flying: `#A890F0`,
        Ghost: `#705898`,
        Grass: `#78C850`,
        Ground: `#E0C068`,
        Ice: `#98D8D8`,
        Normal: `#A8A878`,
        Poison: `#A040A0`,
        Psychic: `#F85888`,
        Rock: `#B8A038`,
        Steel: `#B8B8D0`,
        Water: `#6890F0`,
      }
    },
  },
  plugins: [],
}
