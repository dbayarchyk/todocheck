import { defineMessages } from "react-intl";

const scope = "pages.Task";

export default defineMessages({
  backLink: {
    defaultMessage: "Back to the tasks",
    id: `${scope}.backLink`,
  },
  headline: {
    defaultMessage: "Edit task",
    id: `${scope}.headline`,
  },
  taskNotFound: {
    defaultMessage: "The task is not found.",
    id: `${scope}.taskNotFound`,
  },
  loadingMessage: {
    defaultMessage: "Loading the task...",
    id: `${scope}.loadingMessage`,
  },
  loadedMessage: {
    defaultMessage: "Task {taskTitle} has been loaded.",
    id: `${scope}.loadedMessage`,
  },
  updatingMessage: {
    defaultMessage: "Updating the task...",
    id: `${scope}.updatingMessage`,
  },
  updatedMessage: {
    defaultMessage: "The task has been updated.",
    id: `${scope}.updatedMessage`,
  },
});
