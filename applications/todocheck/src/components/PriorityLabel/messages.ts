import { defineMessages } from "react-intl";

const scope = "components.PriorityLabel";

export default defineMessages({
  priorityLow: {
    defaultMessage: "Low",
    id: `${scope}.priorityLow`,
  },
  priorityMedium: {
    defaultMessage: "Medium",
    id: `${scope}.priorityMedium`,
  },
  priorityHigh: {
    defaultMessage: "High",
    id: `${scope}.priorityHigh`,
  },
});
