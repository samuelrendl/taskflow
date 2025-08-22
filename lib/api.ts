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
            id
            name
            }
        }
      }
    `,
  });
  return data.me;
};

export const createOrganization = async (name: string, ownerId: string) => {
  const data = await graphqlRequest<{createOrganization: Organization}>({
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
  return data.createOrganization;
};

export const deleteOrganization = async (id: string) => {
  const data = await graphqlRequest<{deleteOrganization: Organization}>({
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
  return data.deleteOrganization;
};
