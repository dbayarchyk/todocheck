import React from "react";
import { Link as StyledLink } from "@dbayarhyk/design-system";
import { Link as ReachLink } from "@reach/router";

type LinkProps = React.ComponentProps<typeof ReachLink>;

const Link = React.forwardRef<typeof ReachLink, LinkProps>((props, ref) => (
  <StyledLink as={ReachLink} {...(props as any)} ref={ref} />
));

export default Link;
