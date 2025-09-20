import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://aicrew_owner:wUepBgKK9HNy@ep-frosty-wood-a5sgg9vz.us-east-2.aws.neon.tech/aicrew?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;

// Test connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});