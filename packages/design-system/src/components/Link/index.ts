import { styled } from '../../themed-styled-components';
import { focusable } from '../../mixings/focusable';
import { regularText } from '../../mixings/regularText';

export const Link = styled.a`
  ${regularText('normal')}
  ${focusable}

  color: ${props => props.theme.color.primary.main};
  cursor: pointer;
  text-decoration: none;

  :hover {
    color: ${props => props.theme.color.primary.dark};
    text-decoration: underline;
  }
`;
