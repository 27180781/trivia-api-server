// 1. ייבוא הספריות שהתקנו
const express = require('express');
const { Pool } = require('pg');

// 2. יצירת אפליקציית Express
const app = express();
const PORT = process.env.PORT || 3000;

// 3. הגדרת החיבור למסד הנתונים (PostgreSQL)
//    החלף את הערכים בפרטים של מסד הנתונים שלך!
const pool = new Pool({
  user: 'postgres',                 // שם משתמש ברירת מחדל של Postgres ב-CapRover
  host: 'srv-captain--trivia-db',   // <-- חשוב! זו הכתובת הפנימית של ה-DB
  database: 'postgres',             // שם מסד נתונים ברירת מחדל
  password: '96bc72f14fd0f446', // <-- הסיסמה החזקה שהמצאת ושמרת בשלב 4
  port: 5432,                       // פורט ברירת המחדל
});

// 4. יצירת נקודת קצה (API Endpoint) ראשונה לבדיקה
//    שתפקידה לוודא שהשרת עובד והחיבור למסד הנתונים תקין
app.get('/api/status', async (req, res) => {
  try {
    // נבצע שאילתה פשוטה למסד הנתונים כדי לקבל את השעה הנוכחית
    const dbResult = await pool.query('SELECT NOW()');
    const dbTime = dbResult.rows[0].now;

    res.json({
      status: 'ok',
      message: 'THIS IS THE NEW VERSION - JULY 9',
      databaseTime: dbTime,
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to connect to the database.',
    });
  }
});
// 5. הפעלת השרת
app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
});

// <--- שום דבר לא אמור להופיע אחרי שורות אלה