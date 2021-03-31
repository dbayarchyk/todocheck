declare module "@auth0/auth0-spa-js" {
  const createAuth0Client: (initOptions: any) => Promise<any>;

  export default createAuth0Client;
}
