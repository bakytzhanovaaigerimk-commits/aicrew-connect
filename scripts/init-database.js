const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_xhHMfZ6Iz8dL@ep-morning-tooth-agnusonk-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function initializeDatabase() {
  try {
    console.log('🔗 Подключение к базе данных...');

    // Create students table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        course VARCHAR(100) NOT NULL,
        program VARCHAR(50),
        tariff VARCHAR(50),
        telegram VARCHAR(100),
        parent_name VARCHAR(255),
        additional_info TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await pool.query(createTableQuery);
    console.log('✅ Таблица students создана успешно!');

    // Check if table exists and show its structure
    const checkTable = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'students'
      ORDER BY ordinal_position
    `);

    console.log('📋 Структура таблицы students:');
    checkTable.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type} (${row.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });

    // Count existing records
    const countResult = await pool.query('SELECT COUNT(*) FROM students');
    console.log(`📊 Количество записей в таблице: ${countResult.rows[0].count}`);

  } catch (error) {
    console.error('❌ Ошибка при инициализации базы данных:', error);
  } finally {
    await pool.end();
    console.log('🔌 Соединение с базой данных закрыто');
  }
}

initializeDatabase();