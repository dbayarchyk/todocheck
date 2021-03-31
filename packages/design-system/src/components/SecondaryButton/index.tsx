import { styled } from '../../themed-styled-components';
import { BasicButton } from '../BasicButton';
import { focusable } from '../../mixings';

export const SecondaryButton = styled(BasicButton)`
  ${focusable}

  border-color: ${props => props.theme.color.primary['300']};
  color: ${props => props.theme.color.primary['500']};

  &:hover {
    background: ${props => props.theme.color.grey['100']}
    border-color: ${props => props.theme.color.primary['500']};
    color: ${props => props.theme.color.primary['700']};
  }
`;
