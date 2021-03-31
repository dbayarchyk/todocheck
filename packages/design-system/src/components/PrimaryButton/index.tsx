import readableColor from 'polished/lib/color/readableColor';

import { styled } from '../../themed-styled-components';
import { BasicButton } from '../BasicButton';
import { focusable } from '../../mixings';

export const PrimaryButton = styled(BasicButton)`
  ${focusable}

  background: ${props => props.theme.color.primary['500']};
  border-color: ${props => props.theme.color.primary['500']};
  color: ${props => readableColor(props.theme.color.primary['500'])};

  &:hover {
    background: ${props => props.theme.color.primary['700']};
    border-color: ${props => props.theme.color.primary['700']};
    color: ${props => readableColor(props.theme.color.primary['700'])};
  }
`;
