import { graphqlRequest } from "./graphqlRequest";
import { CreateOrgResponse, MeResponse } from "./types";

export const fetchMe = async () => {
  const data = await graphqlRequest<MeResponse>({
    query: `
      query {
        me {
          id
          name
          email
          organization {
            name
          }
        }
      }
    `,
  });
  return data.me;
};

export const createOrganization = async (name: string, ownerId: string) => {
  return graphqlRequest<CreateOrgResponse>({
    query: `
      mutation CreateOrganization($name: String!, $ownerId: String!) {
        createOrganization(name: $name, ownerId: $ownerId) {
          id
          name
          owner {
            id
            email
          }
        }
      }
    `,
    variables: {
      name,
      ownerId,
    },
  });
};
