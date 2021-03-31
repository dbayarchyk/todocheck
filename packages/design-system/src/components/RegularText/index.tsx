import { styled } from '../../themed-styled-components';

import { regularText, RegularTextPriority } from '../../mixings/regularText';

type RegularTextProps = {
  priority?: RegularTextPriority;
};

export const RegularText = styled.p<RegularTextProps>`
  ${props => regularText(props.priority)}
`;
