import React from "react";
import {
  createGlobalStyle,
  globalStyles,
  inset,
  styled,
} from "@dbayarhyk/design-system";
import { Router } from "@reach/router";

import { IntlProvider } from "./i18n";
import SwitchableThemeProvider from "./SwitchableThemeProvider";
import Header from "./components/Header";
import Index from "./pages/Index";
import Task from "./pages/Task";
import NewTask from "./pages/NewTask";
import Settings from "./pages/Settings";
import { startLiveDataBasesSync } from "./data/tasks";
import { provisionCouchDB } from "./data/provision";
import { useAuth0 } from "./react-auth0-spa";
import config from "./config";

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
  }

  body,
  #root {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      flex-direction: column-reverse;
    }
  }

  ${globalStyles}
`;

const Main = styled.main`
  ${inset("medium")}

  flex: 1;
  overflow: auto;

  /* Route Page div */
  > div {
    height: 100%;
  }
`;

const App: React.FC = () => {
  const { loading: authLoading, user, getTokenSilently } = useAuth0();
  const [loading, setLoading] = React.useState(false);
  const liveReplicationHandler = React.useRef<
    ReturnType<typeof startLiveDataBasesSync>
  >();

  React.useEffect(() => {
    (async () => {
      if (config.AUTH_DISABLED || config.COUCH_DB_SYNC_DISABLED) {
        return;
      }

      setLoading(true);

      if (user) {
        const token = await getTokenSilently({
          audience: config.AUTH0_AUDIENCE,
        });

        const provisionResult = await provisionCouchDB(user.sub, token);

        if (provisionResult) {
          liveReplicationHandler.current = startLiveDataBasesSync(
            provisionResult.tasks
          );
        }
      } else if (liveReplicationHandler.current) {
        liveReplicationHandler.current.cancel();
      }

      setLoading(false);

      const onUnMountHandler = () => {
        if (liveReplicationHandler.current) {
          liveReplicationHandler.current.cancel();
        }
      };

      return onUnMountHandler;
    })();
  }, [user]);

  if (authLoading || loading) {
    return <div>Loading ...</div>;
  }

  return (
    <IntlProvider>
      <SwitchableThemeProvider>
        <GlobalStyles />
        <Header />
        <Main>
          <Router>
            <Index path="/" />
            <Task path="/task/:id" />
            <NewTask path="/task" />
            <Settings path="/settings" />
          </Router>
        </Main>
      </SwitchableThemeProvider>
    </IntlProvider>
  );
};

export default App;
