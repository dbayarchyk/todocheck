import React from "react";
import { ThemeProvider, theme } from "@dbayarhyk/design-system";

const reversedGrey = {
  100: "#000000",
  200: "#202020",
  300: "#404040",
  400: "#606060",
  500: "#808080",
  600: "#9F9F9F",
  700: "#BFBFBF",
  800: "#DFDFDF",
  900: "#FFFFFF"
};

const reversedPrimary = {
  100: "#0D47A1",
  200: "#1565C0",
  300: "#1976D2",
  400: "#1E88E5",
  500: "#2196F3",
  600: "#42A5F5",
  700: "#64B5F6",
  800: "#90CAF9",
  900: "#BBDEFB"
};

const reversedSecondary = {
  100: "#E65100",
  200: "#EF6C00",
  300: "#F57C00",
  400: "#FB8C00",
  500: "#FF9800",
  600: "#FFA726",
  700: "#FFB74D",
  800: "#FFCC80",
  900: "#FFE0B2"
};

const darkTheme = {
  ...theme,
  color: {
    ...theme.color,
    backgroundColor: reversedGrey[100],
    borders: {
      main: reversedGrey[200]
    },
    grey: reversedGrey,
    primary: {
      ...theme.color.primary,
      ...reversedPrimary,
      main: reversedPrimary[500],
      light: reversedPrimary[100],
      dark: reversedPrimary[900]
    },
    secondary: {
      ...theme.color.secondary,
      ...reversedSecondary,
      main: reversedSecondary[500],
      light: reversedSecondary[100],
      dark: reversedSecondary[900]
    }
  }
};

const LOCAL_STORAGE_KEY = "prefered-color-theme";

export type ColorTheme = "light" | "dark";

const isSystemColorThemeDark = () =>
  window &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getColorThemeBasedOnTheSystem = () =>
  isSystemColorThemeDark() ? "dark" : "light";

const getUserPreferedColorThere = (): ColorTheme | null =>
  window && (window.localStorage.getItem(LOCAL_STORAGE_KEY) as ColorTheme);

const saveUsePreferedColorTheme = (colorTheme: ColorTheme) => {
  if (window) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, colorTheme);
  }
};

export const SwitchableThemeContext = React.createContext({
  colorTheme: "light",
  setColorTheme: (newColorTheme: "light" | "dark") => {}
});

const SwitchableThemeProvider: React.FC = ({ children }) => {
  const defaultColorTheme =
    getUserPreferedColorThere() || getColorThemeBasedOnTheSystem();

  const [colorTheme, setColorTheme] = React.useState<"light" | "dark">(
    defaultColorTheme
  );

  const setColorThemeHandler = (newColorTheme: ColorTheme) => {
    setColorTheme(newColorTheme);
    saveUsePreferedColorTheme(newColorTheme);
  };

  return (
    <SwitchableThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme: setColorThemeHandler
      }}
    >
      <ThemeProvider theme={colorTheme === "light" ? theme : darkTheme}>
        {children}
      </ThemeProvider>
    </SwitchableThemeContext.Provider>
  );
};

export default SwitchableThemeProvider;
