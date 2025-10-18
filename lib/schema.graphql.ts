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

  enum TaskStatus {
    OPEN
    IN_PROGRESS
    CLOSED
    UNASSIGNED
  }

  enum TaskPriority {
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
    tasksAssigned: [Task!]!
    tasksCreated: [Task!]!
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
    tasksAssigned: [Task!]!
  }

  type Task {
    id: String!
    title: String!
    description: String!
    status: TaskStatus!
    priority: TaskPriority!
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
    tasks(teamId: String!): [Task!]!
    me: User
    user(id: String!): User
    organization(id: String!): Organization
  }

  type Mutation {
    createOrganization(name: String! ownerId: String!): Organization!
    deleteOrganization(id: String!): Organization!
    inviteUserToOrganization(userId: String!, organizationId: String!): User!
    removeUserFromOrganization(userId: String!): User!
    createTeam(name: String!, organizationId: String!): Team!
    deleteTeam(id: String!): Team!
    inviteUserToTeam(userId: String!, teamId: String!): User!
    removeUserFromTeam(userId: String!): User!
    createTask(title: String!, description: String!, status: TaskStatus!, priority: TaskPriority!, assignTo: String, teamId: String): Task!
    deleteTask(id: String!): Task!
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
    tasks: async (
      _parent: unknown,
      args: { teamId: string },
      context: GraphQLContext,
    ) => {
      return context.prisma.task.findMany({
        where: { teamId: args.teamId },
        include: {
          assignedTo: true,
          createdBy: true,
          team: true,
        },
      });
    },

    me: async (_parent: unknown, _args: object, context: GraphQLContext) => {
      const session = await auth();

      if (!session || !session.user?.email) return null;

      return context.prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          organization: true,
          team: true,
          tasksAssigned: true,
          tasksCreated: true,
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
          teams: {
            include: {
              users: true,
            },
          },
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
        throw new Error(
          "Only the organization owner can delete the organization",
        );
      }

      return context.prisma.$transaction(async (prisma) => {
        await prisma.task.deleteMany({
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
        include: { organization: true, team: true },
      });
    },
    createTeam: async (
      _parent: unknown,
      args: { name: string; organizationId: string },
      context: GraphQLContext,
    ) => {
      const currentUser = await getCurrentUser(context);

      const organization = await context.prisma.organization.findUniqueOrThrow({
        where: { id: args.organizationId },
        select: { ownerId: true },
      });

      if (organization.ownerId !== currentUser.id) {
        throw new Error("Only the organization owner can create teams");
      }

      return context.prisma.team.create({
        data: {
          name: args.name,
          organization: {
            connect: { id: args.organizationId },
          },
        },
        include: {
          users: true,
          organization: true,
        },
      });
    },
    deleteTeam: async (
      _parent: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      const currentUser = await getCurrentUser(context);

      const team = await context.prisma.team.findUniqueOrThrow({
        where: { id: args.id },
        include: { organization: { select: { ownerId: true } } },
      });

      if (team.organization.ownerId !== currentUser.id) {
        throw new Error("Only the organization owner can delete teams");
      }

      return context.prisma.$transaction(async (prisma) => {
        await prisma.user.updateMany({
          where: { teamId: args.id },
          data: { teamId: null },
        });

        await prisma.task.updateMany({
          where: { teamId: args.id },
          data: { teamId: null },
        });

        return prisma.team.delete({
          where: { id: args.id },
          include: {
            users: true,
            organization: true,
          },
        });
      });
    },
    inviteUserToTeam: async (
      _parent: unknown,
      args: { userId: string; teamId: string },
      context: GraphQLContext,
    ) => {
      const currentUser = await getCurrentUser(context);

      if (currentUser.role !== "MANAGER" && currentUser.role !== "OWNER") {
        throw new Error("Only the managers and owner can invite users");
      }

      const userToInvite = await context.prisma.user.findUniqueOrThrow({
        where: { id: args.userId },
        select: { teamId: true },
      });

      if (userToInvite.teamId) {
        throw new Error("User is already part of a team");
      }

      return context.prisma.user.update({
        where: { id: args.userId },
        data: { teamId: args.teamId },
        include: { team: true },
      });
    },
    removeUserFromTeam: async (
      _parent: unknown,
      args: { userId: string },
      context: GraphQLContext,
    ) => {
      const currentUser = await getCurrentUser(context);

      const userToRemove = await context.prisma.user.findUniqueOrThrow({
        where: { id: args.userId },
        select: {
          teamId: true,
          team: { include: { organization: { select: { ownerId: true } } } },
        },
      });

      if (!userToRemove.teamId || !userToRemove.team) {
        throw new Error("User is not in a team");
      }

      const isOwner = userToRemove.team.organization.ownerId === currentUser.id;
      const isManager = currentUser.role === "MANAGER";

      if (!isOwner && !isManager) {
        throw new Error(
          "Only the organization owner or managers can remove users from a team",
        );
      }

      return context.prisma.user.update({
        where: { id: args.userId },
        data: { teamId: null },
        include: { team: true },
      });
    },
    createTask: async (
      _parent: unknown,
      args: {
        title: string;
        description: string;
        status: "OPEN" | "IN_PROGRESS" | "CLOSED" | "UNASSIGNED";
        priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
        assignTo?: string;
        teamId?: string;
      },
      context: GraphQLContext,
    ) => {
      const currentUser = await getCurrentUser(context);

      return context.prisma.task.create({
        data: {
          title: args.title,
          description: args.description,
          status: args.status,
          priority: args.priority,
          createdById: currentUser.id,
          assignedToId: args.assignTo,
          teamId: args.teamId,
        },
        include: {
          assignedTo: true,
          createdBy: true,
          team: true,
        },
      });
    },
    deleteTask: async (
      _parent: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      return context.prisma.task.delete({
        where: { id: args.id },
      });
    },
  },
};
