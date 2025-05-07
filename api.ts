import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Test the database connection
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Successfully connected to the database!');
    console.log('Test query result:', result);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });