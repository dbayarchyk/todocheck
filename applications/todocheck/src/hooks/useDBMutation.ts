import React from "react";

type MutationResult<Data> = {
  loading: boolean;
  error: null | any;
  data: Data | null;
};
type DBMutation<Mutation, Data> = [Mutation, MutationResult<Data>];

const useDBMutation = <
  Handler extends (...args: any) => Promise<any>,
  Data = ReturnType<Handler> extends Promise<infer X> ? X : unknown
>(
  handler: Handler
): DBMutation<Handler, Data> => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Data | null>(null);
  const [error, setError] = React.useState(null);

  const mutate = React.useCallback(
    (...args: Parameters<Handler>): Promise<Data> => {
      setLoading(true);

      return handler(...args)
        .then(data => {
          setData(data);
          return data;
        })
        .catch(error => {
          setError(error);
          return error;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [handler]
  );

  return [
    mutate as Handler,
    {
      loading,
      data,
      error
    }
  ];
};

export default useDBMutation;
