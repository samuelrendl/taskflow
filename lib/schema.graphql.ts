import { GraphQLContext } from "./context";
import { auth } from "../auth";

const getCurrentUser = async (context: GraphQLContext) => {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Authentication required");
  }

  const user = await context.prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

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
    removeUserFromOrganization(userId: String!): User!
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
            orderBy: { createdAt: "asc" },
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
      return context.prisma.$transaction(async (prisma) => {
        await prisma.user.update({
          where: { id: args.ownerId },
          data: { role: "OWNER" },
        });

        return prisma.organization.create({
          data: {
            name: args.name,
            ownerId: args.ownerId,
            users: { connect: { id: args.ownerId } },
          },
          include: {
            owner: true,
            users: true,
          },
        });
      });
    },
    deleteOrganization: async (
      _parent: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      const currentUser = await getCurrentUser(context);
      
      const organization = await context.prisma.organization.findUniqueOrThrow({
        where: { id: args.id },
        select: { ownerId: true },
      });

      if (organization.ownerId !== currentUser.id) {
        throw new Error("Only the organization owner can delete the organization");
      }

      return context.prisma.$transaction(async (prisma) => {
        await prisma.issue.deleteMany({
          where: { team: { organizationId: args.id } },
        });

        await prisma.team.deleteMany({
          where: { organizationId: args.id },
        });

        const deletedOrg = await prisma.organization.delete({
          where: { id: args.id },
          include: { owner: true },
        });

        await prisma.user.update({
          where: { id: organization.ownerId },
          data: { role: "USER" },
        });

        return deletedOrg;
      });
    },
    inviteUserToOrganization: async (
      _parent: unknown,
      args: { userId: string; organizationId: string },
      context: GraphQLContext,
    ) => {
      const currentUser = await getCurrentUser(context);
      
      const organization = await context.prisma.organization.findUniqueOrThrow({
        where: { id: args.organizationId },
        select: { ownerId: true },
      });

      if (organization.ownerId !== currentUser.id) {
        throw new Error("Only the organization owner can invite users");
      }

      const userToInvite = await context.prisma.user.findUniqueOrThrow({
        where: { id: args.userId },
        select: { organizationId: true },
      });

      if (userToInvite.organizationId) {
        throw new Error("User is already part of an organization");
      }

      return context.prisma.user.update({
        where: { id: args.userId },
        data: { organizationId: args.organizationId },
        include: { organization: true },
      });
    },
    removeUserFromOrganization: async (
      _parent: unknown,
      args: { userId: string },
      context: GraphQLContext,
    ) => {
      const currentUser = await getCurrentUser(context);

      const userToRemove = await context.prisma.user.findUniqueOrThrow({
        where: { id: args.userId },
        select: { organizationId: true },
      });

      if (!userToRemove.organizationId) {
        throw new Error("User is not in an organization");
      }

      const organization = await context.prisma.organization.findUniqueOrThrow({
        where: { id: userToRemove.organizationId },
        select: { ownerId: true },
      });

      if (organization.ownerId !== currentUser.id) {
        throw new Error("Only the organization owner can remove users");
      }

      return context.prisma.user.update({
        where: { id: args.userId },
        data: {
          organizationId: null,
          teamId: null,
        },
      });
    },
  },
};
