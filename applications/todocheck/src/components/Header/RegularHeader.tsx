import React from "react";
import { FormattedMessage } from "react-intl";
import { styled, Link as StyledLink, inline } from "@dbayarhyk/design-system";

import Link from "../Link";
import { ReactComponent as LogoSVG } from "./logo.svg";
import messages from "./messages";

export const LogoLink = styled(Link)`
  ${inline("tiny")}

  align-items: center;
`;

export const Logo = styled(LogoSVG)`
  height: 1.5em;
  width: 1.5em;
`;

export const LinkStyleButton = styled(StyledLink)`
  background: transparent;
  padding: 0;
  border: 0;
  display: inline;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NavList = styled.ul`
  ${inline("medium")}

  align-items: center;
`;

type RegularHeaderProps = {
  className?: string;
};

const RegularHeader: React.FC<RegularHeaderProps> = ({ className }) => {
  return (
    <HeaderContent className={className}>
      <LogoLink to="/">
        <Logo /> <span>Todo Check</span>
      </LogoLink>
      <NavList>
        <li>
          <Link to="/task">
            <FormattedMessage {...messages.newTask} />
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FormattedMessage {...messages.settings} />
          </Link>
        </li>
      </NavList>
    </HeaderContent>
  );
};

export default RegularHeader;
