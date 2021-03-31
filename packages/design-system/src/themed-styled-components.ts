import * as styledComponents from 'styled-components';

import { Theme } from './theme';

const {
  createGlobalStyle,
  default: styled,
  css,
  keyframes,
  ThemeProvider,
  withTheme,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<Theme>;

export { createGlobalStyle, css, keyframes, ThemeProvider, withTheme, styled };
