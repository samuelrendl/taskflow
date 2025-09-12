import { GraphQLContext } from "./context";
import { auth } from "../auth";

export const typeDefs = `#graphql
  scalar DateTime

  enum Role {
    ADMIN
    OWNER
    MANAGER
    DEVELOPER
    USER
  }

  enum IssueStatus {
    OPEN
    IN_PROGRESS
    CLOSED
    UNASSIGNED
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
    issuesAssigned: [Issue!]!
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
    team: Team
  }

  type Query {
    organizations: [Organization!]!
    teams: [Team!]!
    users: [User!]!
    issues: [Issue!]!
    me: User
    user(id: String!): User
    organization(id: String!): Organization
  }

  type Mutation {
    createOrganization(name: String! ownerId: String!): Organization!
    deleteOrganization(id: String!): Organization!
    inviteUserToOrganization(userId: String!, organizationId: String!): User!
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

    me: async (_parent: unknown, _args: object, context: GraphQLContext) => {
      const session = await auth();

      if (!session || !session.user?.email) return null;

      return context.prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          organization: true,
          team: true,
          issuesAssigned: true,
          issuesCreated: true,
          ownedOrganizations: true,
        },
      });
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

    organization: async (
      _parent: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      return context.prisma.organization.findUnique({
        where: { id: args.id },
        include: {
          owner: true,
          users: {
            orderBy: { createdAt: 'asc' },
          },
          teams: true,
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
      const result = await context.prisma.$transaction(async (prisma) => {
        await prisma.user.update({
          where: { id: args.ownerId },
          data: { role: 'OWNER' }
        });

        return prisma.organization.create({
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
      });

      return result;
    },
    deleteOrganization: async (
      _parent: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      const session = await auth();
      if (!session || !session.user?.email) {
        throw new Error("Authentication required");
      }

      const currentUser = await context.prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!currentUser) {
        throw new Error("User not found");
      }

      const organization = await context.prisma.organization.findUnique({
        where: { id: args.id },
        select: { ownerId: true },
      });

      if (!organization) {
        throw new Error("Organization not found");
      }

      if (organization.ownerId !== currentUser.id) {
        throw new Error(
          "Only the organization owner can delete the organization",
        );
      }

      await context.prisma.issue.deleteMany({
        where: {
          team: {
            organizationId: args.id,
          },
        },
      });

      await context.prisma.team.deleteMany({
        where: {
          organizationId: args.id,
        },
      });

      const result = await context.prisma.$transaction(async (prisma) => {
        const deletedOrg = await prisma.organization.delete({
          where: { id: args.id },
          include: {
            owner: true,
            teams: true,
          },
        });

        await prisma.user.update({
          where: { id: organization.ownerId },
          data: { role: 'USER' }
        });

        return deletedOrg;
      });

      return result;
    },

    inviteUserToOrganization: async (
      _parent: unknown,
      args: { userId: string; organizationId: string },
      context: GraphQLContext,
    ) => {
      const session = await auth();
      if (!session || !session.user?.email) {
        throw new Error("Authentication required");
      }

      const currentUser = await context.prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!currentUser) {
        throw new Error("User not found");
      }

      const organization = await context.prisma.organization.findUnique({
        where: { id: args.organizationId },
        select: { ownerId: true },
      });

      if (!organization) {
        throw new Error("Organization not found");
      }

      if (organization.ownerId !== currentUser.id) {
        throw new Error("Only the organization owner can invite users");
      }

      const existingUser = await context.prisma.user.findUnique({
        where: { id: args.userId },
        select: { organizationId: true },
      });

      if (!existingUser) {
        throw new Error("User to invite not found");
      }

      if (existingUser.organizationId) {
        throw new Error("User is already part of an organization");
      }

      const updatedUser = await context.prisma.user.update({
        where: { id: args.userId },
        data: {
          organizationId: args.organizationId,
        },
        include: {
          organization: true,
        },
      });

      return updatedUser;
    },
  },
};
