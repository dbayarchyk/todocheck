import { styled } from "@dbayarhyk/design-system";

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${props => props.theme.layout.containerWidth};
`;

export default Container;
