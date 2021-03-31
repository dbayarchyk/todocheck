import { css } from '../themed-styled-components';
import { Theme } from '../theme';

export const stack = (scale: keyof Theme['spacings']) => css`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: ${props => props.theme.spacings[scale]};
  }
`;
