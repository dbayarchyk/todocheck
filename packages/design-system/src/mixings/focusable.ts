import { css } from '../themed-styled-components';

export const focusable = css`
  &:not([tabindex='-1']):focus {
    outline: none;
    box-shadow: 0px 0px 2px 2px ${props => props.theme.color.primary['500']};
  }
`;
