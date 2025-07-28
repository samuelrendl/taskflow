import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs, resolvers } from "@/lib/schema.graphql";
import { createContext } from "@/lib/context";

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: createContext,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
