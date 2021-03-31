import React from "react";

const useDBQuery = <Handler extends (...args: any) => Promise<any>>(
  handler: Handler
) => {
  type Data = ReturnType<Handler> extends Promise<infer X> ? X : unknown;

  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<Data | null>(null);
  const [error, setError] = React.useState(null);

  const fetch = React.useCallback(() => {
    return handler()
      .then(setData)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [handler]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    refetch: fetch,
    loading,
    data,
    error
  };
};

export default useDBQuery;
