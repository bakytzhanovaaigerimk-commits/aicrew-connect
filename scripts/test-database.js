const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_xhHMfZ6Iz8dL@ep-morning-tooth-agnusonk-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function testDatabase() {
  try {
    console.log('🧪 Тестирование базы данных...');

    // Insert test record
    const insertQuery = `
      INSERT INTO students (
        name, age, phone, email, course, program, tariff, telegram, parent_name, additional_info
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;

    const testData = [
      'Тестовый Студент',
      15,
      '+7 777 123 4567',
      'test@example.com',
      'AI Creator',
      null,
      null,
      '@teststudent',
      null,
      'Тестовая запись для проверки'
    ];

    const result = await pool.query(insertQuery, testData);
    console.log('✅ Тестовая запись добавлена:', result.rows[0]);

    // Get all records
    const selectQuery = 'SELECT * FROM students ORDER BY created_at DESC';
    const allRecords = await pool.query(selectQuery);

    console.log(`📊 Всего записей в таблице: ${allRecords.rows.length}`);
    console.log('📋 Все записи:');
    allRecords.rows.forEach((row, index) => {
      console.log(`  ${index + 1}. ${row.name} (${row.email}) - ${row.course}`);
    });

  } catch (error) {
    if (error.code === '23505') {
      console.log('⚠️  Тестовая запись уже существует (email должен быть уникальным)');

      // Get all records anyway
      const selectQuery = 'SELECT * FROM students ORDER BY created_at DESC';
      const allRecords = await pool.query(selectQuery);

      console.log(`📊 Всего записей в таблице: ${allRecords.rows.length}`);
      console.log('📋 Все записи:');
      allRecords.rows.forEach((row, index) => {
        console.log(`  ${index + 1}. ${row.name} (${row.email}) - ${row.course}`);
      });
    } else {
      console.error('❌ Ошибка при тестировании:', error);
    }
  } finally {
    await pool.end();
    console.log('🔌 Соединение с базой данных закрыто');
  }
}

testDatabase();