import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: ApolloClient<object> | null = null;

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql",
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            todos: {
              merge(_, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
  });
}

export function getApolloClient() {
  if (!client) {
    client = createApolloClient();
  }
  return client;
}
