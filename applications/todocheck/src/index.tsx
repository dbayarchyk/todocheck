import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "./react-auth0-spa";
import * as serviceWorker from "./serviceWorker";
import config from "./config";

ReactDOM.render(
  <Auth0Provider
    domain={config.AUTH0_DOMAIN}
    client_id={config.AUTH0_CLIENT_ID}
    redirect_uri={window.location.origin}
    audience={config.AUTH0_AUDIENCE}
    scope={config.AUTH0_SCOPE}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
