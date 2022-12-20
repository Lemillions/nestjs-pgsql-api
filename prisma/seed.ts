import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: { email: "mvsatnso2003@gmail.com"},
    update: {},
    create: {
      email: 'mvsantos2003@gmail.com',
      name: "Marcos",
      password: "123456",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "marcosvsdxd@gmail.com"},
    update: {},
    create: {
      email: "marcosvsdxd@gmail.com",
      name: "Marcos Vinicius",
      password: "123456",
    },
  });

  console.log({ user1, user2 });



}

main()
    .catch((e) => {
      throw e;
    }
    )
    .finally(async () => {
      await prisma.$disconnect();
    });