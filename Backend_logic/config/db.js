require('dotenv').config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root", 
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "consiouscart",
  port: parseInt(process.env.DB_PORT) || 3306
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    console.error("Check your database configuration in .env file");
    console.error("Make sure MySQL is running and credentials are correct");
    return;
  }
  console.log(`MySQL Connected to ${process.env.DB_NAME || 'consiouscart'} database...`);
});

module.exports = db;
