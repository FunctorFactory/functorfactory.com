import type { Config } from 'tailwindcss';
import flowbite from 'flowbite/plugin';

const themeColors = 
{
  midnight: '#253b79',
  trueBlue: '#4169b1',
  chefchaouen: '#4f86e0',
  clementine: '#ff6f0d',
  mangoJuice: '#ffa539',
}

const config: Config = {
  content: [
    './node_modules/flowbite-react/lib/**/*.js',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: themeColors.midnight,
        secondary: themeColors.trueBlue,
        tertiary: themeColors.clementine,
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      }
    }
  },
  plugins: [flowbite],
};
export default config;
