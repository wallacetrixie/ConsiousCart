require('dotenv').config();

module.exports = {
  SECRET_KEY: process.env.JWT_SECRET || "yA%55G_9;;y7ttFFF%5VVeer547^^8gf5AAWJ88990OHHtvr5:</",
  SESSION_SECRET: process.env.SESSION_SECRET || "your-super-secret-session-key-here-2024",
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development'
};
