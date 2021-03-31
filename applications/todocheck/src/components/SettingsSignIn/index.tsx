import React from "react";
import { FormattedMessage } from "react-intl";
import {
  RegularText,
  PrimaryButton,
  SecondaryButton,
} from "@dbayarhyk/design-system";

import config from "../../config";
import { useAuth0 } from "../../react-auth0-spa";
import messages from "./messages";

const SettingsSignIn: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  if (config.AUTH_DISABLED) {
    return null;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <RegularText priority="low">
            <FormattedMessage {...messages.signedInAs} />
          </RegularText>
          <RegularText priority="high">{user.email}</RegularText>

          <SecondaryButton type="button" onClick={logout}>
            <FormattedMessage {...messages.signOut} />
          </SecondaryButton>
        </div>
      ) : (
        <div>
          <PrimaryButton type="button" onClick={loginWithRedirect}>
            <FormattedMessage {...messages.signIn} />
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default SettingsSignIn;
