import { PrismaClient } from "@prisma/client";

//this is creating a prisma client instance on the global object by typecasting the global object
//with a type of the object.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
//this is storing the prisma client instance if it is already there in the global object,
//if it is not there then we create a new prismaClient with logging enabled for queries.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

//in development servers, we don't want to exhaust our database connections due to hot reloading
//so instead we store the prisma client in the global object and reuse it.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
