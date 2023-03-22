import {createTheme} from '@shopify/restyle';
import {
  buttonVariants,
  textVariants,
  spacing,
  colors,
  containerVariants,
  imageVariants,
} from 'themeConfig';

const theme = createTheme({
  colors,
  spacing,
  breakpoints: {},
  textVariants,
  buttonVariants,
  containerVariants,
  imageVariants,
});

// for dark mode create another theme

export type Theme = typeof theme;

export default theme;
