const config = {
  COUCH_DB_SYNC_DISABLED:
    !process.env.REACT_APP_COUCH_DB_SYNC_ENABLED ||
    !process.env.REACT_APP_COUCH_DB_ADMIN_USERNAME ||
    !process.env.REACT_APP_COUCH_DB_ADMIN_PASSWORD,
  COUCH_DB_DATABASES: ["tasks"],
  COUCH_DB_HOST: process.env.REACT_APP_COUCH_DB_HOST!,
  COUCH_DB_ADMIN_USERNAME: process.env.REACT_APP_COUCH_DB_ADMIN_USERNAME!,
  COUCH_DB_ADMIN_PASSWORD: process.env.REACT_APP_COUCH_DB_ADMIN_PASSWORD!,

  AUTH_DISABLED:
    !process.env.REACT_APP_AUTH0_DOMAIN ||
    !process.env.REACT_APP_AUTH0_CLIENT_ID ||
    !process.env.REACT_APP_AUTH0_AUDIENCE,
  AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN!,
  AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID!,
  AUTH0_AUDIENCE: process.env.REACT_APP_AUTH0_AUDIENCE!,
  AUTH0_SCOPE: [
    "openid",
    "profile",
    "email",
    "user_metadata",
    "read:current_user",
    "update:current_user_metadata"
  ].join(" ")
};

export default config;
