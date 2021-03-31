import { css } from '../themed-styled-components';
import { Theme } from '../theme';

export const inset = (scale: keyof Theme['spacings']) => css`
  padding: ${props => props.theme.spacings[scale]};
`;
