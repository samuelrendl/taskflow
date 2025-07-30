import { GraphQLContext } from "./context";

export const typeDefs = `#graphql
  scalar DateTime

  enum Role {
    USER
    ADMIN
    MANAGER
    DEVELOPER
  }

  enum IssueStatus {
    OPEN
    IN_PROGRESS
    CLOSED
  }

  enum IssuePriority {
    LOW
    MEDIUM
    HIGH
    CRITICAL
  }

  type User {
    id: String!
    name: String
    email: String!
    emailVerified: DateTime
    role: Role!
    image: String
    team: Team
    organization: Organization
    ownedOrganizations: [Organization!]!
    issuesAssigned: [Issue!]!
    issuesCreated: [Issue!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Organization {
    id: String!
    name: String!
    owner: User!
    users: [User!]!
    teams: [Team!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Team {
    id: String!
    name: String!
    users: [User!]!
    organization: Organization!
  }

  type Issue {
    id: String!
    title: String!
    description: String!
    status: IssueStatus!
    priority: IssuePriority!
    assignedTo: User
    createdBy: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    organizations: [Organization!]!
    teams: [Team!]!
    users: [User!]!
    issues: [Issue!]!
    user(id: String!): User
  }

  type Mutation {
    createOrganization(name: String! ownerId: String!): Organization!
  }
`;

export const resolvers = {
  Query: {
    users: async (_parent: unknown, _args: object, context: GraphQLContext) => {
      return context.prisma.user.findMany();
    },
    organizations: async (
      _parent: unknown,
      _args: object,
      context: GraphQLContext,
    ) => {
      return context.prisma.organization.findMany();
    },
    teams: async (_parent: unknown, _args: object, context: GraphQLContext) => {
      return context.prisma.team.findMany();
    },
    issues: async (
      _parent: unknown,
      _args: object,
      context: GraphQLContext,
    ) => {
      return context.prisma.issue.findMany();
    },

    user: async (
      _parent: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      return context.prisma.user.findUnique({
        where: { id: args.id },
        include: {
          organization: true,
        },
      });
    },
  },

  Mutation: {
    createOrganization: async (
      _parent: unknown,
      args: { name: string; ownerId: string },
      context: GraphQLContext,
    ) => {
      return context.prisma.organization.create({
        data: {
          name: args.name,
          owner: {
            connect: {
              id: args.ownerId,
            },
          },
          users: {
            connect: {
              id: args.ownerId,
            },
          },
        },
        include: {
          owner: true,
          users: true,
        },
      });
    },
  },
};
