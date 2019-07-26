const theme = {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [
    '0.75rem',
    '0.875rem',
    '1rem',
    '1.25rem',
    '1.5rem',
    '2rem',
    '3rem',
    '4rem',
  ],
  lineHeights: [],
  colors: {
    lightPrimary: '#9575cd',
    primary: '#673ab7',
    darkPrimary: '#512da8',
    highlight: '#3d5afe',
    black: '#333',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    sans: 'Tahoma, Geneva, sans-serif',
    serif: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    mono: '"Courier New", Courier, monospace',
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 6px 19px 6px rgba(121, 121, 121, 0.32)',
  },
  text: {
    title: {
      fontFamily: 'serif',
    },
    default: {
      fontfamily: 'sans',
    },
  },
};

const mediaQueries = theme.breakpoints.map(
  bp => `@media only screen and (min-width: ${bp})`
);

export { theme as default, mediaQueries };
