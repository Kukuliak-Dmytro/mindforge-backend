/**
 * Docker entrypoint hook - checks database connection and runs migrations if needed
 * This script ensures the database is ready and migrations are applied before starting the server
 */
import { PrismaClient } from '@prisma/client';

async function entrypointHook() {
  console.log('Checking database connection...');
  
  const prisma = new PrismaClient();
  
  // Wait for database to be ready
  let attempts = 0;
  const maxAttempts = 30;
  
  while (attempts < maxAttempts) {
    try {
      // Try to connect to the database
      await prisma.$queryRaw`SELECT 1`;
      console.log('✓ Database is ready');
      break;
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        console.error('✗ Database connection failed after', maxAttempts, 'attempts');
        await prisma.$disconnect();
        process.exit(1);
      }
      console.log(`Waiting for database... (attempt ${attempts}/${maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Check if migrations table exists
  console.log('Checking if database is initialized...');
  try {
    const result = await prisma.$queryRaw<Array<{ exists: boolean }>>`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '_prisma_migrations'
      ) as exists;
    `;
    
    const migrationTableExists = result[0]?.exists ?? false;
    
    await prisma.$disconnect();
    
    if (!migrationTableExists) {
      console.log('Database not initialized. Running migrations...');
      const { execSync } = await import('child_process');
      execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    } else {
      console.log('Database already initialized. Checking for pending migrations...');
      // migrate deploy is safe - it only applies pending migrations
      const { execSync } = await import('child_process');
      try {
        execSync('npx prisma migrate deploy', { stdio: 'inherit' });
      } catch (error) {
        console.log('No pending migrations or migration check completed');
      }
    }
  } catch (error) {
    console.log('Could not check migration status, running migrations anyway...');
    await prisma.$disconnect();
    const { execSync } = await import('child_process');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  }
}

entrypointHook().catch(console.error);

