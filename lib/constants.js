export const COLORS = {
  gray: {
    100: '185deg 5% 95%',
    200: '188deg 5% 87%',
    300: '190deg 5% 80%',
    500: '196deg 4% 60%',
    700: '220deg 5% 40%',
    900: '220deg 3% 20%',
  },
  white: '0deg 0% 100%',
  black: '0deg 0% 0%',
  primary: '340deg 88% 57%',
  secondary: '240deg 60% 63%',
  background: '#FAEDCD',
}

export const WEIGHTS = {
  thin: 300,
  normal: 500,
  medium: 600,
  bold: 800,
}

// desktop-first approach
export const BREAKPOINTS = {
  phone: 600,
  tablet: 950,
  laptop: 1300,
}

export const QUERIES = {
  tabletAndBigger: `(min-width: ${BREAKPOINTS.tablet / 16}rem)`,
}

export const THEME = {
  queries: QUERIES,
  colors: COLORS,
  weights: WEIGHTS,
}
