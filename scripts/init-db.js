const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://aicrew_owner:wUepBgKK9HNy@ep-frosty-wood-a5sgg9vz.us-east-2.aws.neon.tech/aicrew?sslmode=require",
  ssl: {
    rejectUnauthorized: false
  }
});

async function initializeDatabase() {
  try {
    console.log('Connecting to database...');

    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to PostgreSQL database');

    // Create students table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        course VARCHAR(255) NOT NULL,
        program VARCHAR(255),
        tariff VARCHAR(255),
        telegram VARCHAR(255),
        parent_name VARCHAR(255),
        additional_info TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(createTableQuery);
    console.log('✅ Students table created successfully');

    // Add some test data
    const testStudentQuery = `
      INSERT INTO students (name, age, phone, email, course, telegram)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
    `;

    const result = await pool.query(testStudentQuery, [
      'Тест Студент',
      16,
      '+7 777 123 45 67',
      'test@aicrew.connect',
      'AI Creator',
      '@test_student'
    ]);

    if (result.rows.length > 0) {
      console.log('✅ Test student added');
    } else {
      console.log('ℹ️ Test student already exists');
    }

    console.log('🎉 Database initialization completed!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

initializeDatabase();