import { styled } from '../../themed-styled-components';
import { Theme } from '../../theme';
import { stack } from '../../mixings';

export interface StackProps {
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
  scale?: keyof Theme['spacings'];
}

export const Stack = styled.div<StackProps>`
  ${props => stack(props.scale!)}

  align-items: ${props => props.alignItems};
`;

Stack.defaultProps = {
  alignItems: 'stretch',
  scale: 'small',
} as Partial<StackProps>;

Stack.displayName = 'Stack';
