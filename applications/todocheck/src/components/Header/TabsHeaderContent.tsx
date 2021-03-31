import React from "react";
import { FormattedMessage } from "react-intl";
import {
  styled,
  inset,
  RegularText,
  stack,
  HomeIcon,
  ListAddIcon,
  CogIcon,
} from "@dbayarhyk/design-system";
import Link from "../Link";
import messages from "./messages";

export const Container = styled.div`
  display: flex;
  padding-bottom: 10px;
`;

export const Button = styled.button`
  ${inset("small")}
  ${stack("tiny")}

  flex: 1;
  border: 0;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  ${inset("small")}
  ${stack("small")}

  flex: 1;
  border: 0;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme.color.grey[900]}

  &:hover {
    text-decoration: none;
  }
`;

export const ButtonTitle = styled(RegularText)`
  font-size: 0.85rem;
  line-height: 1;
`;

type TabsHeaderContentProps = {
  className?: string;
};

const TabsHeaderContent: React.FC<TabsHeaderContentProps> = ({ className }) => {
  return (
    <Container className={className}>
      <StyledLink to="/settings">
        <CogIcon />
        <ButtonTitle priority="low">
          <FormattedMessage {...messages.settings} />
        </ButtonTitle>
      </StyledLink>
      <StyledLink to="/">
        <HomeIcon />
        <ButtonTitle priority="low">
          <FormattedMessage {...messages.home} />
        </ButtonTitle>
      </StyledLink>
      <StyledLink to="/task">
        <ListAddIcon />
        <ButtonTitle priority="low">
          <FormattedMessage {...messages.newTask} />
        </ButtonTitle>
      </StyledLink>
    </Container>
  );
};

export default TabsHeaderContent;
