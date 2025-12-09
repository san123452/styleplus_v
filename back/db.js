// db.js
const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // 🔽 수정: DB_PORT 환경 변수를 사용하도록 변경 🔽
  port: process.env.DB_PORT || 3306, 
  connectionLimit: 5
});

module.exports = pool;