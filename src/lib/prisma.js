import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();

if (!global.prismaGlobal) {
  global.prismaGlobal = prismaClientSingleton();
}

const prisma = global.prismaGlobal;

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}

export default prisma;
