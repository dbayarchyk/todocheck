import { defineMessages } from "react-intl";

const scope = "components.SettingsThemeColor";

export default defineMessages({
  legend: {
    defaultMessage: "Theme Color",
    id: `${scope}.legend`,
  },
  light: {
    defaultMessage: "Light",
    id: `${scope}.light`,
  },
  dark: {
    defaultMessage: "Dark",
    id: `${scope}.dark`,
  },
});
