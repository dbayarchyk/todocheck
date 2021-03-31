import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Radio,
  RegularText,
  ColorPaletteIcon,
  inline,
  styled,
} from "@dbayarhyk/design-system";

import {
  SwitchableThemeContext,
  ColorTheme,
} from "../../SwitchableThemeProvider";
import messages from "./messages";

const Radios = styled.div`
  ${inline("big")}
`;

const SettingsThemeColor: React.FC = () => {
  const { colorTheme, setColorTheme } = React.useContext(
    SwitchableThemeContext
  );

  return (
    <fieldset>
      <legend>
        <RegularText priority="high">
          <RegularText priority="low" as="span">
            <ColorPaletteIcon alginWithText />
          </RegularText>{" "}
          <FormattedMessage {...messages.legend} />
        </RegularText>
      </legend>

      <Radios>
        <label>
          <RegularText>
            <Radio
              name="themeColor"
              value="light"
              checked={colorTheme === "light"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setColorTheme(event.target.value as ColorTheme);
              }}
            />{" "}
            <FormattedMessage {...messages.light} />
          </RegularText>
        </label>

        <label>
          <RegularText>
            <Radio
              name="themeColor"
              value="dark"
              checked={colorTheme === "dark"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setColorTheme(event.target.value as ColorTheme);
              }}
            />{" "}
            <FormattedMessage {...messages.dark} />
          </RegularText>
        </label>
      </Radios>
    </fieldset>
  );
};

export default SettingsThemeColor;
