import { styled, css } from '../../themed-styled-components';

export interface DividerProps {
  vertical?: boolean;
}

export const Divider = styled.div<DividerProps>`
  ${props => {
    const border = props.vertical ? 'border-left' : 'border-top';
    const size = props.theme.borders.width.small;
    const color = props.theme.color.borders.main;

    return css`
      ${border}: ${size} solid ${color};
    `;
  }}
`;
