type GraphQLRequestParams = {
  query: string;
  variables?: Record<string, unknown>;
};

export const graphqlRequest = async <T>({
  query,
  variables,
}: GraphQLRequestParams): Promise<T> => {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
};
