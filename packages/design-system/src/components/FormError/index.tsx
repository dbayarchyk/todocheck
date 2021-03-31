import React from 'react';

import { styled } from '../../themed-styled-components';
import { RegularText } from '../RegularText';
import { ExclamationSolidIcon } from '../Icons/ExclamationSolidIcon';

const StyledRegularText = styled(RegularText)`
  color: ${props => props.theme.color.danger.main};
`;

type FormErrorProps = Omit<
  Omit<React.ComponentProps<typeof RegularText>, 'priority'>,
  'textStyle'
>;

export const FormError: React.FC<FormErrorProps> = ({
  children,
  ...restProps
}) => (
  <StyledRegularText {...restProps}>
    <ExclamationSolidIcon /> <span>{children}</span>
  </StyledRegularText>
);
