const spacings = {
  tiny: '0.25rem',
  small: '0.5rem',
  medium: '1rem',
  big: '1.5rem',
  huge: '2rem',
  gigantic: '4rem',
};

const layout = {
  containerWidth: '75em',
};

const breakpoints = {
  mobile: '46em',
  tablet: '75em',
};

const primary = {
  100: '#BBDEFB',
  200: '#90CAF9',
  300: '#64B5F6',
  400: '#42A5F5',
  500: '#2196F3',
  600: '#1E88E5',
  700: '#1976D2',
  800: '#1565C0',
  900: '#0D47A1',
};

const secondary = {
  100: '#FFE0B2',
  200: '#FFCC80',
  300: '#FFB74D',
  400: '#FFA726',
  500: '#FF9800',
  600: '#FB8C00',
  700: '#F57C00',
  800: '#EF6C00',
  900: '#E65100',
};

const grey = {
  100: '#FFFFFF',
  200: '#DFDFDF',
  300: '#BFBFBF',
  400: '#9F9F9F',
  500: '#808080',
  600: '#606060',
  700: '#404040',
  800: '#202020',
  900: '#000000',
};

// Reversed
// const grey = {
//   100: '#000000',
//   200: '#202020',
//   300: '#404040',
//   400: '#606060',
//   500: '#808080',
//   600: '#9F9F9F',
//   700: '#BFBFBF',
//   800: '#DFDFDF',
//   900: '#FFFFFF',
// };

const palette = {
  grey,
  backgroundColor: grey[100],
  borders: {
    main: grey[200],
  },
  default: {
    main: '#e0e0e0',
    mainContrast: '#000000',
    light: '#ffffff',
    lightContrast: '#000000',
    dark: '#aeaeae',
    darkContrast: '#000000',
  },
  primary: {
    main: primary['500'],
    mainContrast: '#fff',
    light: primary['100'],
    lightContrast: '#fff',
    dark: primary['900'],
    darkContrast: '#fff',
    ...primary,
  },
  secondary: {
    main: secondary['500'],
    mainContrast: '#000000',
    light: secondary['100'],
    lightContrast: '#000000',
    dark: secondary['900'],
    darkContrast: '#000000',
    ...secondary,
  },
  success: {
    main: '#4caf50',
    mainContrast: '#fff',
    light: '#c8e6c9',
    lightContrast: '#000000',
    dark: '#1b5e20',
    darkContrast: '#fff',
  },
  danger: {
    main: '#f44336',
    mainContrast: '#000000',
    light: '#ffcdd2',
    lightContrast: '#fff',
    dark: '#b71c1c',
    darkContrast: '#fff',
  },
};

const borders = {
  width: {
    small: '0.0625em',
    medium: '0.125em',
    big: '0.1875em',
  },
  radius: {
    small: '0.1875em',
    medium: '0.3em',
    big: '0.5em',
  },
};

const typography = {
  fontFamily: 'Inter, sans-serif',
  lineHeights: {
    body: '1.5em',
    headline: '1.1em',
  },
  weights: {
    regular: 400,
    semiBold: 600,
  },
  letterSpacings: {
    normal: 'normal',
    uppercaseText: '0.1em',
  },
  maxCharactersPerLine: 60,
};

const toast = {
  minDurationTime: 2000,
  durationTimePerCharacter: 100,
};

export const theme = {
  layout,
  breakpoints,
  spacings,
  borders,
  typography,
  toast,
  squishRatio: 2,
  color: palette,
};

export type Theme = Readonly<typeof theme>;
