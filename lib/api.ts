import { graphqlRequest } from "./graphqlRequest";
import { Organization, MeResponse, User } from "./types";

export const fetchMe = async () => {
  const data = await graphqlRequest<MeResponse>({
    query: `
      query {
        me {
          id
          name
          email
          role
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
  const data = await graphqlRequest<{ createOrganization: Organization }>({
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
  const data = await graphqlRequest<{ deleteOrganization: Organization }>({
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

export const fetchOrganization = async (id: string) => {
  const data = await graphqlRequest<{ organization: Organization }>({
    query: `
      query GetOrganization($id: String!) {
        organization(id: $id) {
          id
          name
          owner {
            id
            name
            email
          }
          users {
            id
            name
            email
            role
            image
            createdAt
          }
          teams {
            id
            name
          }
        }
      }
    `,
    variables: {
      id,
    },
  });
  return data.organization;
};

export const fetchAvailableUsers = async () => {
  const data = await graphqlRequest<{ users: User[] }>({
    query: `
      query {
        users {
          id
          name
          email
          image
        }
      }
    `,
  });
  return data.users;
};

export const inviteUserToOrganization = async (
  userId: string,
  organizationId: string,
) => {
  const data = await graphqlRequest<{ inviteUserToOrganization: User }>({
    query: `
      mutation InviteUserToOrganization($userId: String!, $organizationId: String!) {
        inviteUserToOrganization(userId: $userId, organizationId: $organizationId) {
          id
          name
          email
          role
        }
      }
    `,
    variables: {
      userId,
      organizationId,
    },
  });
  return data.inviteUserToOrganization;
};

export const removeUserFromOrganization = async (userId: string) => {
  const data = await graphqlRequest<{ removeUserFromOrganization: User }>({
    query: `
      mutation RemoveUserFromOrganization($userId: String!) {
        removeUserFromOrganization(userId: $userId) {
          id
          name
        }}`,
    variables: {
      userId,
    },
  });
  return data.removeUserFromOrganization;
};

export const inviteUserToTeam = async (userId: string, teamId: string) => {
  const data = await graphqlRequest<{ inviteUserToTeam: User }>({
    query: `
      mutation InviteUserToTeam($userId: String!, $teamId: String!) {
        inviteUserToTeam(userId: $userId, teamId: $teamId) {
          id
          name
          email
          role
          }
        }`,
    variables: {
      userId,
      teamId,
    },
  });
  return data.inviteUserToTeam;
};
