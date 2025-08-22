import { graphqlRequest } from "./graphqlRequest";
import { Organization, MeResponse } from "./types";

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
  return graphqlRequest<Organization>({
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

export const deleteOrganization = async (id: string) => {
  return graphqlRequest<Organization>({
    query: `
      mutation DeleteOrganization($id: String!) {
        deleteOrganization(id: $id) {
          id
          name
        }
      }
    `,
    variables: {
      id,
    },
  });
};
