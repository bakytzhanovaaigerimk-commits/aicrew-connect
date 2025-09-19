import pool from './db';

const initializeDatabase = async () => {
  try {
    // Create students table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        course VARCHAR(100) NOT NULL,
        program VARCHAR(50),
        tariff VARCHAR(50),
        telegram VARCHAR(100),
        parent_name VARCHAR(255),
        additional_info TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default initializeDatabase;