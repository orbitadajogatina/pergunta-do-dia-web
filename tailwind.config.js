import colors from 'tailwindcss/colors';

export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/odj-svelte-ui/dist/**/*.{html,js,svelte,ts}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['monospace', 'monospace']
    },
    extend: {
      colors: {
        primary: {
          50: '#eefbf6',
          100: '#d7f4e7',
          200: '#b2e8d3',
          300: '#7fd6b9',
          400: '#4bbc9b',
          500: '#28a182',
          600: '#197e66',
          700: '#156756',
          800: '#135245',
          900: '#10443a',
          950: '#082621',
        },
        secondary: {
            50: '#fff1f1',
            100: '#fee5e5',
            200: '#fccfd0',
            300: '#faa7a9',
            400: '#f6767c',
            500: '#ee4552',
            600: '#dd2e44',
            700: '#b81830',
            800: '#9a172f',
            900: '#84172f',
            950: '#4a0714',
        },
        "light-surface": colors.neutral,
        "dark-surface": colors.neutral,
      },
    },
  },
};
