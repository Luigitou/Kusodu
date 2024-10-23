import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.findMany();
  if (roles.length === 0) {
    await prisma.role.create({
      data: {
        name: 'admin',
        description: 'Administrator of the application',
      },
    });
    await prisma.role.create({
      data: {
        name: 'premium',
        description: 'Premium user of the application',
      },
    });
    await prisma.role.create({
      data: {
        name: 'user',
        description: 'Free user of the application',
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
