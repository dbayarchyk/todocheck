import { styled } from '../../themed-styled-components';
import { inset } from '../../mixings/inset';
import { focusable } from '../../mixings/focusable';
import { regularText } from '../../mixings/regularText';

type IconButtonProps = {
  ['aria-label']: string;
  color?: 'primary' | 'secondary';
};

export const IconButton = styled.button<IconButtonProps>`
  ${regularText('normal')}
  ${inset('small')}
  ${focusable}

  display: inline-flex;
  background: transparent;
  border-width: 0;
  border-radius: 50%;
  line-height: 1;
  color: ${props => props.theme.color[props.color!].main};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};

  &:hover {
    color: ${props => props.theme.color[props.color!].dark};
    background: ${props => props.theme.color.grey[200]};
  }
`;

IconButton.defaultProps = {
  color: 'primary',
};
