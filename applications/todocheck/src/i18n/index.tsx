import React from "react";
import {
  // useIntl,
  IntlProvider as BaseIntlProvider,
} from "react-intl";
// import { PrimitiveType } from "intl-messageformat";

// "import type" ensures en messages aren't bundled by default
// import sourceOfTruth from "./translations/en.json";
// Note: in order to use "import type" you'll need Babel >= 7.9.0 and/or TypeScript >= 3.8.
// Otherwise, you can use a normal import and accept to always bundle one language + the user required one

export type LocaleMessages = any; // typeof sourceOfTruth;
export type LocaleKey = keyof LocaleMessages;

// export function useFormatMessage(): (
//   id: LocaleKey, // only accepts valid keys, not any string
//   values?: Record<string, PrimitiveType>
// ) => string {
//   const intl = useIntl();

//   return (id, values) => intl.formatMessage({ id }, values);
// }

export type SupportedLocales = "en" | "ru";

// return type on this signature enforces that all languages have the same translations defined
export function importMessages(
  locale: SupportedLocales
): Promise<LocaleMessages> {
  switch (locale) {
    case "en":
      return import("./translations/en.json");
    case "ru":
      return import("./translations/ru.json");
  }
}

type IntlProviderProps = Omit<
  React.ComponentProps<typeof BaseIntlProvider>,
  "messages" | "locale"
>;

const LOCAL_STORAGE_KEY = "prefered-locale";

const DEFAULT_LOCALE = "en";

const getUserPreferedLocale = (): SupportedLocales | null =>
  window &&
  (window.localStorage.getItem(LOCAL_STORAGE_KEY) as SupportedLocales);

const saveUserPreferedLocale = (lacale: SupportedLocales) => {
  if (window) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, lacale);
  }
};

export const LocaleContext = React.createContext({
  locale: DEFAULT_LOCALE,
  setLocale: (locale: SupportedLocales) => {},
});

export const IntlProvider: React.FC<IntlProviderProps> = (props) => {
  const defaultLocale: SupportedLocales =
    getUserPreferedLocale() || DEFAULT_LOCALE;
  const [locale, setLocale] = React.useState<SupportedLocales>(defaultLocale);

  const [messages, setMessages] = React.useState<LocaleMessages | null>(null);

  React.useEffect(() => {
    importMessages(locale as SupportedLocales).then((data) => {
      setMessages(
        data.default.reduce(
          (acc: any, { id, defaultMessage }: any) => ({
            ...acc,
            [id]: defaultMessage,
          }),
          {}
        )
      );
    });
  }, [locale]);

  if (!messages) {
    return null;
  }

  const setLocaleHandler = (locale: SupportedLocales) => {
    setLocale(locale);
    saveUserPreferedLocale(locale);
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale: setLocaleHandler,
      }}
    >
      <BaseIntlProvider
        {...props}
        locale={locale}
        key={locale}
        messages={messages}
      />
    </LocaleContext.Provider>
  );
};
