import transparentize from 'polished/lib/color/transparentize';
import readableColor from 'polished/lib/color/readableColor';

import { BasicButton } from '../BasicButton';
import { focusable } from '../../mixings/focusable';
import { styled } from '../../themed-styled-components';

export const TertiaryButton = styled(BasicButton)`
  ${focusable}

  color: ${props => props.theme.color.grey['900']};

  &:hover {
    background: ${props => transparentize(0.3, props.theme.color.grey['200'])};
    border-color: ${props =>
      transparentize(0.3, props.theme.color.grey['100'])};
    color: ${props => readableColor(props.theme.color.grey['200'])};
  }
`;
