// import { PrismaClient } from "@prisma/client";
//
// const prismaClientSingleton = () => new PrismaClient();
//
// if (!global.prismaGlobal) {
//   global.prismaGlobal = prismaClientSingleton();
// }
//
// const prisma = global.prismaGlobal;
//
// if (process.env.NODE_ENV !== "production") {
//   global.prismaGlobal = prisma;
// }
//
// export default prisma;

import { PrismaClient } from "@prisma/client";

// Створюємо singleton для Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Ініціалізація глобального об’єкта
const globalForPrisma = globalThis;

// Використовуємо глобальний об’єкт або створюємо новий екземпляр
const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton();

// Зберігаємо екземпляр у глобальний об’єкт у режимі розробки
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaGlobal = prisma;
}

export default prisma;
