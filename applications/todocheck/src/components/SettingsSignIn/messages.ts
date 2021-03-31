import { defineMessages } from "react-intl";

const scope = "components.SettingsSignIn";

export default defineMessages({
  signIn: {
    defaultMessage: "Sign In",
    id: `${scope}.signIn`,
  },
  signOut: {
    defaultMessage: "Sign out",
    id: `${scope}.signOut`,
  },
  signedInAs: {
    defaultMessage: "Signed in as",
    id: `${scope}.signedInAs`,
  },
});
