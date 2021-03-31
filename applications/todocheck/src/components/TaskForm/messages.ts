import { defineMessages } from "react-intl";

const scope = "components.TaskForm";

export default defineMessages({
  titleLabel: {
    defaultMessage: "Title",
    id: `${scope}.titleLabel`,
  },
  titlePlaceholder: {
    defaultMessage: "What needs to be done?",
    id: `${scope}.titlePlaceholder`,
  },
  priorityLabel: {
    defaultMessage: "Priority",
    id: `${scope}.priorityLabel`,
  },
  priorityNoneLabel: {
    defaultMessage: "None",
    id: `${scope}.priorityNoneLabel`,
  },
  priorityLowLabel: {
    defaultMessage: "Low",
    id: `${scope}.priorityLowLabel`,
  },
  priorityMediumLabel: {
    defaultMessage: "Medium",
    id: `${scope}.priorityMediumLabel`,
  },
  priorityHighLabel: {
    defaultMessage: "High",
    id: `${scope}.priorityHighLabel`,
  },
  descriptionLabel: {
    defaultMessage: "Description",
    id: `${scope}.descriptionLabel`,
  },
  descriptionPlaceholder: {
    defaultMessage: "Is there anything to add? Leave it here...",
    id: `${scope}.descriptionPlaceholder`,
  },
  cancelButtonTitle: {
    defaultMessage: "Cancel",
    id: `${scope}.cancelButtonTitle`,
  },
  saveButtonTitle: {
    defaultMessage: "Save",
    id: `${scope}.saveButtonTitle`,
  },
});
