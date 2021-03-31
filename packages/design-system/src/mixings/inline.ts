import { css } from '../themed-styled-components';
import { Theme } from '../theme';

export const inline = (scale: keyof Theme['spacings']) => css`
  display: flex;
  flex-direction: row;

  > * + * {
    margin-left: ${props => props.theme.spacings[scale]};
  }
`;
