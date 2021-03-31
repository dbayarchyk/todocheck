import React from "react";
import { useIntl } from "react-intl";
import {
  styled,
  regularText,
  css,
  CheveronOutlineUpIcon,
  CheveronOutlineDownIcon,
} from "@dbayarhyk/design-system";

import messages from "./messages";

type Priority = "low" | "medium" | "high";

type PriorityLabelProps = {
  priority: Priority;
};

const StyledText = styled.span<PriorityLabelProps>`
  ${regularText("normal")}

  ${(props) => {
    switch (props.priority) {
      case "low":
        return css`
          color: ${props.theme.color.success.light};
        `;
      case "medium":
        return css`
          color: ${props.theme.color.success.main};
        `;
      case "high":
        return css`
          color: ${props.theme.color.danger.main};
        `;
    }
  }}
`;

const PriorityLabel: React.FC<PriorityLabelProps> = ({ priority }) => {
  const intl = useIntl();

  const textByPriority: { [key in Priority]: string } = {
    low: intl.formatMessage(messages.priorityLow),
    medium: intl.formatMessage(messages.priorityMedium),
    high: intl.formatMessage(messages.priorityHigh),
  };

  return (
    <StyledText priority={priority}>
      {" "}
      {priority === "low" ? (
        <CheveronOutlineDownIcon alginWithText />
      ) : (
        <CheveronOutlineUpIcon alginWithText />
      )}{" "}
      {textByPriority[priority]}
    </StyledText>
  );
};

export default PriorityLabel;
