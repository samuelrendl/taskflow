import { prisma } from "@/prisma";

export type GraphQLContext = {
  prisma: typeof prisma;
};

export async function createContext(): Promise<GraphQLContext> {
  return {
    prisma,
  };
}
