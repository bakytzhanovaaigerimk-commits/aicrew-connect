const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_xhHMfZ6Iz8dL@ep-morning-tooth-agnusonk-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function checkSchema() {
  try {
    console.log('🔍 Проверяем схемы и таблицы в базе данных...');

    // Check current database and schema
    const currentDB = await pool.query('SELECT current_database(), current_schema()');
    console.log('📍 Текущая база данных:', currentDB.rows[0].current_database);
    console.log('📍 Текущая схема:', currentDB.rows[0].current_schema);

    // List all schemas
    const schemas = await pool.query(`
      SELECT schema_name
      FROM information_schema.schemata
      WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
      ORDER BY schema_name
    `);

    console.log('\n📂 Доступные схемы:');
    schemas.rows.forEach(row => {
      console.log(`  - ${row.schema_name}`);
    });

    // List all tables in all schemas
    const tables = await pool.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
      AND table_schema NOT IN ('information_schema', 'pg_catalog')
      ORDER BY table_schema, table_name
    `);

    console.log('\n📋 Все таблицы:');
    if (tables.rows.length === 0) {
      console.log('  Таблицы не найдены');
    } else {
      tables.rows.forEach(row => {
        console.log(`  - ${row.table_schema}.${row.table_name}`);
      });
    }

    // Check if students table exists specifically
    const studentsTable = await pool.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_name = 'students'
    `);

    console.log('\n🎯 Таблица students:');
    if (studentsTable.rows.length === 0) {
      console.log('  ❌ Не найдена');
    } else {
      studentsTable.rows.forEach(row => {
        console.log(`  ✅ Найдена в схеме: ${row.table_schema}`);
      });
    }

    // Try to create table explicitly in public schema
    console.log('\n🛠️  Пересоздаём таблицу в схеме public...');

    const createTableQuery = `
      DROP TABLE IF EXISTS public.students;
      CREATE TABLE public.students (
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
      );
    `;

    await pool.query(createTableQuery);
    console.log('✅ Таблица public.students создана успешно!');

    // Insert test data
    const insertQuery = `
      INSERT INTO public.students (
        name, age, phone, email, course, program, tariff, telegram, parent_name, additional_info
      ) VALUES
      ('Анна Иванова', 22, '+7 777 111 2233', 'anna@example.com', 'AI Creator', null, null, '@anna_ai', null, 'Дизайнер, хочет изучить AI'),
      ('Максим Петров', 14, '+7 777 444 5566', 'maxim@example.com', 'AI Kids', '12-17', 'standard', '@maxim_coder', 'Петрова Елена', 'Интересуется программированием'),
      ('София Сидорова', 10, '+7 777 777 8899', 'sofia@example.com', 'AI Kids', '8-12', 'basic', '@sofia_young', 'Сидоров Андрей', 'Любит рисовать и мультики')
      ON CONFLICT (email) DO NOTHING;
    `;

    const insertResult = await pool.query(insertQuery);
    console.log(`✅ Добавлено ${insertResult.rowCount || 0} тестовых записей`);

    // Check final table content
    const finalCheck = await pool.query('SELECT COUNT(*) as count FROM public.students');
    console.log(`📊 Итого записей в таблице: ${finalCheck.rows[0].count}`);

  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await pool.end();
    console.log('🔌 Соединение закрыто');
  }
}

checkSchema();