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
  },
};
