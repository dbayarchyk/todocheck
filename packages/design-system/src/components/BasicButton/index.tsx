import { styled, css } from '../../themed-styled-components';
import {
  inline,
  insetSquish,
  getInsetSquishHorizontalSpacing,
} from '../../mixings';

export const BasicButton = styled.button`
  ${insetSquish('small')}
  ${inline('small')}

  align-items: center;
  line-height: 1.5;
  font-family: ${props => props.theme.typography.fontFamily};
  font-weight: ${props => props.theme.typography.weights.semiBold};
  font-size: 1rem;
  text-decoration: none;
  background: transparent;
  border-width: ${props => props.theme.borders.width.medium};
  border-style: solid;
  border-color: transparent;
  border-radius: calc(
    ${props => getInsetSquishHorizontalSpacing('small', props.theme)} * 1.5
  );
  cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};

  ${props =>
    props.disabled &&
    css`
      cursor: 'not-allowed';
    `}
`;
