import { prisma } from "@/prisma";

export type GraphQLContext = {
  prisma: typeof prisma;
};

export function createContext(): GraphQLContext {
  return {
    prisma,
  };
}
