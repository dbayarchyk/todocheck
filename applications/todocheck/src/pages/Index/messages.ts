import { defineMessages } from "react-intl";

const scope = "pages.Index";

export default defineMessages({
  outdatedHeadline: {
    defaultMessage: "Outdated",
    id: `${scope}.outdatedHeadline`,
  },
  todayHeadline: {
    defaultMessage: "Today",
    id: `${scope}.todayHeadline`,
  },
  tomorrowHeadline: {
    defaultMessage: "Tomorrow",
    id: `${scope}.tomorrowHeadline`,
  },
  futureHeadline: {
    defaultMessage: "Upcoming",
    id: `${scope}.futureHeadline`,
  },
  completedHeadline: {
    defaultMessage: "Completed",
    id: `${scope}.completedHeadline`,
  },
  emptyStateTitle: {
    defaultMessage: "Wow, well done!",
    id: `${scope}.emptyStateTitle`,
  },
  emptyStateSubtitle: {
    defaultMessage: "You've finished all your tasks.",
    id: `${scope}.emptyStateSubtitle`,
  },
  emptyStateLink: {
    defaultMessage: "Add a new one?",
    id: `${scope}.emptyStateLink`,
  },
});
