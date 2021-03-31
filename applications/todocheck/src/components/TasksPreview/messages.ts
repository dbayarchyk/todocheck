import { defineMessages } from "react-intl";

const scope = "components.TasksPreview";

export default defineMessages({
  noTasksMessage: {
    defaultMessage: "There is no tasks yet. Please create",
    id: `${scope}.noTasksMessage`,
  },
  newTaskLinkTitle: {
    defaultMessage: "a new task",
    id: `${scope}.newTaskLinkTitle`,
  },
});
