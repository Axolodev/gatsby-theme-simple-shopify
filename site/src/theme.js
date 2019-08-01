const colors = {
  lightPrimary: '#9575cd',
  primary: '#5e35b1',
  darkPrimary: '#311b92',
  highlight: '#ff3d00',
  darkHighlight: '#dd2c00',
  black: '#333',
};

const breakpoints = ['40em', '52em', '64em'];

const theme = {
  breakpoints,
  mediaQueries: breakpoints.map(
    bp => `@media only screen and (min-width: ${bp})`
  ),
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
  lineHeights: [1.58, 1.42, 1.313],
  colors,
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
  buttons: {
    default: {
      transition: '300ms ease all',
      backgroundColor: colors.primary,
      borderRadius: 0,
      fontWeight: 'bold',
      '&:focus': {
        backgroundColor: colors.darkPrimary,
      },
      '&:disabled': {
        opacity: 0.7,
      },
    },
    highlight: {
      fontWeight: 'bold',
      borderRadius: 0,
      transition: '300ms ease all',
      backgroundColor: colors.highlight,
      '&:focus': {
        backgroundColor: colors.darkHighlight,
      },
      '&:disabled': {
        opacity: 0.7,
      },
    },
  },
};

export default theme;
