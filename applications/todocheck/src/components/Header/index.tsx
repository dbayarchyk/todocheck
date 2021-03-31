import React from "react";
import { styled, inset } from "@dbayarhyk/design-system";

import Container from "../Container";

import RegularHeader from "./RegularHeader";
import TabsHeaderContent from "./TabsHeaderContent";

export const StyledHeader = styled.header`
  ${inset("medium")}

  background: ${props => props.theme.color.grey[100]};
  border-style: solid;
  border-color: ${props => props.theme.color.primary[500]};
  border-bottom-width: 3px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0;
    border-bottom-width: 0;
    border-top-width: 3px;
  }
`;

export const StyledRegularHeader = styled(RegularHeader)`
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const StyledTabsHeaderContent = styled(TabsHeaderContent)`
  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Container>
        <StyledRegularHeader />
        <StyledTabsHeaderContent />
      </Container>
    </StyledHeader>
  );
};

export default Header;
