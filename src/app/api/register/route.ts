import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import initializeDatabase from '../../../../lib/init-db';
import { sendTelegramNotification, formatStudentRegistration } from '../../../../lib/telegram';

// Initialize database on first request
let dbInitialized = false;

export async function POST(request: NextRequest) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }

    const body = await request.json();
    const {
      name,
      age,
      phone,
      email,
      course,
      program,
      tariff,
      telegram,
      parent_name,
      additional_info
    } = body;

    // Validation
    if (!name || !age || !phone || !email || !course) {
      return NextResponse.json(
        { error: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingStudent = await pool.query(
      'SELECT id FROM students WHERE email = $1',
      [email]
    );

    if (existingStudent.rows.length > 0) {
      return NextResponse.json(
        { error: 'Студент с таким email уже зарегистрирован' },
        { status: 409 }
      );
    }

    // Insert new student
    const result = await pool.query(
      `INSERT INTO students (
        name, age, phone, email, course, program, tariff,
        telegram, parent_name, additional_info
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, name, email, course`,
      [
        name,
        parseInt(age),
        phone,
        email,
        course,
        program || null,
        tariff || null,
        telegram || null,
        parent_name || null,
        additional_info || null
      ]
    );

    const newStudent = result.rows[0];

    // Send Telegram notification
    try {
      const message = formatStudentRegistration({
        name,
        age,
        phone,
        email,
        course,
        telegram
      });
      await sendTelegramNotification(message);
    } catch (telegramError) {
      console.error('Failed to send Telegram notification:', telegramError);
      // Don't fail the registration if Telegram notification fails
    }

    return NextResponse.json({
      success: true,
      message: 'Регистрация прошла успешно!',
      student: newStudent
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера. Попробуйте позже.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all students (for admin purposes)
    const result = await pool.query(
      'SELECT id, name, age, phone, email, course, program, tariff, created_at FROM students ORDER BY created_at DESC'
    );

    return NextResponse.json({
      success: true,
      students: result.rows
    });

  } catch (error) {
    console.error('Get students error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}