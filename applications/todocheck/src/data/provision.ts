import config from "../config";

const login = (name: string, password: string): Promise<Response> => {
  return fetch(`${config.COUCH_DB_HOST}/_session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      password
    })
  });
};

const loginAsAdmin = () =>
  login(config.COUCH_DB_ADMIN_USERNAME, config.COUCH_DB_ADMIN_PASSWORD);

const provisionUser = async (): Promise<{
  name: string;
  password: string;
}> => {
  const name = Math.random()
    .toString()
    .substring(2);
  const password = Math.random()
    .toString()
    .substring(2);

  await fetch(`${config.COUCH_DB_HOST}/_users/org.couchdb.user:${name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      password,
      roles: [],
      type: "user"
    })
  });

  return {
    name,
    password
  };
};

const getDatabaseUri = (dataBaseName: string, userName: string) =>
  `${config.COUCH_DB_HOST}/${dataBaseName}_${userName}`;

const provisionDatabase = (
  name: string,
  userName: string
): Promise<Response> => {
  return fetch(getDatabaseUri(name, userName), {
    method: "PUT",
    credentials: "include"
  });
};

const provisionSecurity = async (
  dataBaseName: string,
  userName: string
): Promise<Response> => {
  return fetch(`${getDatabaseUri(dataBaseName, userName)}/_security`, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      admins: { names: [], roles: [] },
      members: { names: [userName], roles: [] }
    })
  });
};

const getCurrentUserMetaData = (userId: string, accessToken: string) => {
  return fetch(`https://${config.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  }).then(res => res.json());
};

const updateUserAppMetadata = (
  userId: string,
  accessToken: string,
  metaData: any
) => {
  return fetch(`https://${config.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      user_metadata: metaData
    })
  });
};

export const provisionCouchDB = async (userId: string, accessToken: string) => {
  const { user_metadata: metaData = {} } = await getCurrentUserMetaData(
    userId,
    accessToken
  );

  metaData.couchDB = metaData.couchDB || {};

  try {
    await loginAsAdmin();

    if (!metaData.couchDB.username) {
      const couchDBUserMetadata = await provisionUser();

      metaData.couchDB = {
        ...metaData.couchDB,
        username: couchDBUserMetadata.name,
        password: couchDBUserMetadata.password
      };

      const missingDataBases = config.COUCH_DB_DATABASES.filter(
        dataBaseName => !metaData.couchDB[dataBaseName]
      );

      await Promise.all(
        missingDataBases.map(dataBaseName =>
          provisionDatabase(dataBaseName, metaData.couchDB.username)
        )
      );

      await Promise.all(
        missingDataBases.map(dataBaseName =>
          provisionSecurity(dataBaseName, metaData.couchDB.username)
        )
      );

      const missingDataBaseUriMap = missingDataBases.reduce(
        (map, missingDataBaseName) => ({
          ...map,
          [missingDataBaseName]: getDatabaseUri(
            missingDataBaseName,
            metaData.couchDB.username
          )
        }),
        {}
      );

      await login(couchDBUserMetadata.name, couchDBUserMetadata.password);

      metaData.couchDB = {
        ...metaData.couchDB,
        ...missingDataBaseUriMap
      };

      await updateUserAppMetadata(userId, accessToken, metaData);
    }

    const { username, password, ...exposingDatabasesUriMap } = metaData.couchDB;

    return exposingDatabasesUriMap;
  } catch (err) {
    console.error(err);
  }
};
