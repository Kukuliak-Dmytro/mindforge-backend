import { execSync } from 'child_process';

let retries = 30;
const check = () => {
  try {
    execSync('docker exec mindforge-postgres pg_isready -U postgres', { stdio: 'ignore' });
    console.log('✓ Database is ready');
    process.exit(0);
  } catch (e) {
    if (--retries <= 0) {
      console.error('✗ Database not ready after 30 attempts');
      process.exit(1);
    }
    setTimeout(check, 1000);
  }
};

console.log('Waiting for database to be ready...');
check();

