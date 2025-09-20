import { graphqlRequest } from "./graphqlRequest";
import { Organization, MeResponse, User, Team } from "./types";

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
          organization {
            id
            name
          }
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
          organization {
            id
            name
          }
          team {
            id
            name
          }
        }
      }`,
    variables: {
      userId,
    },
  });
  return data.removeUserFromOrganization;
};

export const createTeam = async (name: string, organizationId: string) => {
  const data = await graphqlRequest<{ createTeam: Team }>({
    query: `
      mutation CreateTeam($name: String!, $organizationId: String!) {
        createTeam(name: $name, organizationId: $organizationId) {
          id
          name
          users {
            id
            name
          }
          organization {
            id
            name
          }
        }
      }`,
    variables: {
      name,
      organizationId,
    },
  });
  return data.createTeam;
};

export const deleteTeam = async (id: string) => {
  const data = await graphqlRequest<{ deleteTeam: Team }>({
    query: `
      mutation DeleteTeam($id: String!) {
        deleteTeam(id: $id) {
          id
          name
          users {
            id
            name
          }
          organization {
            id
            name
          }
        }
      }`,
    variables: {
      id,
    },
  });
  return data.deleteTeam;
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
          team {
            id
            name
          }
        }
      }`,
    variables: {
      userId,
      teamId,
    },
  });
  return data.inviteUserToTeam;
};

export const removeUserFromTeam = async (userId: string) => {
  const data = await graphqlRequest<{ removeUserFromTeam: User }>({
    query: `
      mutation RemoveUserFromTeam($userId: String!) {
        removeUserFromTeam(userId: $userId) {
          id
          name
          team {
            id
            name
          }
        }
      }`,
    variables: {
      userId,
    },
  });
  return data.removeUserFromTeam;
};
