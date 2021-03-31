import { defineMessages } from "react-intl";

const scope = "components.Header";

export default defineMessages({
  newTask: {
    defaultMessage: "New Task",
    id: `${scope}.newTask`,
  },
  settings: {
    defaultMessage: "Settings",
    id: `${scope}.settings`,
  },
  home: {
    defaultMessage: "Home",
    id: `${scope}.home`,
  },
});
