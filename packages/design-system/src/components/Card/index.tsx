import { styled } from '../../themed-styled-components';

export const Card = styled.div`
  background-color: ${props => props.theme.color.grey[100]};
  border-radius: ${props => props.theme.borders.radius.medium};
  border: ${props => props.theme.borders.width.small} solid
    ${props => props.theme.color.borders.main};
`;
