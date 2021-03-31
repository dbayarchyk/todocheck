import React from 'react';

import { styled } from '../../themed-styled-components';
import { inputBox } from '../../mixings/inputBox';
import { CheveronDownIcon } from '../Icons/CheveronDownIcon';

const Container = styled.div`
  display: inline-flex;
  position: relative;
`;

const StyledCheveronDownIcon = styled(CheveronDownIcon)`
  position: absolute;
  right: 0.5em;
  color: ${props => props.theme.color.grey[900]};
`;

const StyledSelect = styled.select`
  ${inputBox}

  padding-right: 1.75em;
  appearance: none;
`;

type FormSelectProps = React.ComponentProps<typeof StyledSelect>;

export const FormSelect: React.FC<FormSelectProps> = props => {
  return (
    <Container>
      <StyledSelect {...props} />
      <StyledCheveronDownIcon />
    </Container>
  );
};
