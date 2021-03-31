import React from "react";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps } from "@reach/router";
import {
  HeadlineText,
  CheveronLeftIcon,
  Stack,
  RegularText,
  FormSelect,
  TranslateIcon,
} from "@dbayarhyk/design-system";

import { LocaleContext, SupportedLocales } from "../../i18n";
import Container from "../../components/Container";
import Link from "../../components/Link";
import SettingsSignIn from "../../components/SettingsSignIn";
import SettingsThemeColor from "../../components/SettingsThemeColor";

import messages from "./messages";

type SettingsProps = RouteComponentProps;

const Settings: React.FC<SettingsProps> = () => {
  const { locale, setLocale } = React.useContext(LocaleContext);

  return (
    <Container>
      <Stack scale="medium">
        <div>
          <Link to="/">
            <CheveronLeftIcon alginWithText /> <FormattedMessage {...messages.backLink} />
          </Link>
        </div>

        <HeadlineText level={1}>
          <FormattedMessage {...messages.headline} />
        </HeadlineText>

        <Stack scale="gigantic">
          <SettingsThemeColor />

          <div>
            <label htmlFor="language">
              <RegularText priority="high">
                <RegularText priority="low" as="span">
                  <TranslateIcon alginWithText />
                </RegularText>{" "}
                <FormattedMessage {...messages.language} />
              </RegularText>
            </label>
            <FormSelect
              id="language"
              value={locale}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setLocale(event.target.value as SupportedLocales);
              }}
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </FormSelect>
          </div>

          <SettingsSignIn />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Settings;
