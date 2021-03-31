import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import { navigate } from "@reach/router";
import config from "./config";

const DEFAULT_REDIRECT_CALLBACK = () => {
  // window.history.replaceState({}, document.title, window.location.pathname);
  navigate(window.location.pathname, { replace: true, state: {} });
};

type Auth0ContextValue = {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup: (params?: {}) => Promise<void>;
  handleRedirectCallback?: () => Promise<void>;
  getIdTokenClaims: (...p: any[]) => any;
  loginWithRedirect: (...p: any[]) => any;
  getTokenSilently: (...p: any[]) => any;
  getTokenWithPopup: (...p: any[]) => any;
  logout: (...p: any[]) => any;
};

export const Auth0Context = React.createContext<Auth0ContextValue>({
  isAuthenticated: false,
  user: null,
  loading: false,
  popupOpen: false,
  loginWithPopup: (params?: {}) => Promise.resolve(),
  handleRedirectCallback: () => Promise.resolve(),
  getIdTokenClaims: (...p: any[]) => null,
  loginWithRedirect: (...p: any[]) => {},
  getTokenSilently: (...p: any[]) => null,
  getTokenWithPopup: (...p: any[]) => null,
  logout: (...p: any[]) => {}
});

export const useAuth0 = () => useContext(Auth0Context);

type Auth0ProviderProps = any;

export const Auth0Provider: React.FC<Auth0ProviderProps> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (config.AUTH_DISABLED) {
      setLoading(false);
      return;
    }

    const initAuth0 = async () => {
      try {
        const auth0FromHook = await createAuth0Client(initOptions);
        setAuth0(auth0FromHook);

        if (window.location.search.includes("code=")) {
          const { appState } = await auth0FromHook.handleRedirectCallback();
          onRedirectCallback(appState);
        }

        const isAuthenticated = await auth0FromHook.isAuthenticated();

        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          const user = await auth0FromHook.getUser();
          setUser(user);
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p: any[]) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p: any[]) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p: any[]) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p: any[]) => auth0Client.getTokenWithPopup(...p),
        logout: (...p: any[]) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
