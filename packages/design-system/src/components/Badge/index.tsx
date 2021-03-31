import readableColor from 'polished/lib/color/readableColor';

import { styled } from '../../themed-styled-components';
import { insetSquish } from '../../mixings/insetSquish';
import { regularText } from '../../mixings/regularText';

type BadgeProps = {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'danger';
};

export const Badge = styled.span<BadgeProps>`
  ${insetSquish('tiny')}
  ${regularText('normal')}

  border-radius: ${props => props.theme.borders.radius.big};
  font-size: 0.85rem;
  font-weight: normal;
  background-color: ${props => props.theme.color.grey['200']};
  color: ${props => readableColor(props.theme.color.grey['200'])};
  vertical-align: middle;
`;

Badge.defaultProps = {
  color: 'default',
};
