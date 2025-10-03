# ConsiousCart - Environment Configuration Guide

## Overview
This guide explains how to set up and configure the environment variables for the ConsiousCart application.

## 🚀 Quick Start

### 1. Database Setup
```bash
# Create MySQL database
sudo mysql -u root -e "CREATE DATABASE IF NOT EXISTS consiouscart;"

# Import the database schema
sudo mysql consiouscart < database_schema.sql
```

### 2. Backend Setup
```bash
cd Backend_logic

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env file with your actual values
nano .env
```

### 3. Frontend Setup
```bash
# From project root
npm install
npm run dev
```

### 4. Start Backend Server
```bash
cd Backend_logic
node SERVER.js
```

## 📁 Environment Files

### `.env` (Backend Configuration)
Located in `Backend_logic/.env` - Contains sensitive configuration data.

**Required Variables:**
```bash
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=consiouscart
DB_PORT=3306

# JWT Secret (Generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### `.env.example` (Template)
Located in `Backend_logic/.env.example` - Template showing all available variables.

## 🔐 Security Features

### Database Security
- Environment variables for database credentials
- Connection error handling with informative messages
- Support for different database configurations per environment

### JWT Security
- Configurable JWT secret key
- Token expiration handling
- Secure session management

### Rate Limiting
- Configurable login attempt limits
- General API rate limiting
- Protection against brute force attacks

### CORS Configuration
- Configurable allowed origins
- Environment-specific CORS settings
- Secure cross-origin requests

## 🔧 Configuration Options

### Database Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | localhost |
| `DB_USER` | MySQL username | root |
| `DB_PASSWORD` | MySQL password | (empty) |
| `DB_NAME` | Database name | consiouscart |
| `DB_PORT` | MySQL port | 3306 |

### Security Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | JWT signing secret | (required) |
| `SESSION_SECRET` | Session encryption key | (required) |

### Server Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |

### Rate Limiting Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `RATE_LIMIT_WINDOW_MS` | General rate limit window | 900000 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |
| `LOGIN_RATE_LIMIT_WINDOW_MS` | Login rate limit window | 900000 |
| `LOGIN_RATE_LIMIT_MAX_ATTEMPTS` | Max login attempts | 5 |

### M-Pesa Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| `CONSUMER_KEY` | Safaricom consumer key | (required) |
| `CONSUMER_SECRET` | Safaricom consumer secret | (required) |
| `SHORTCODE` | Business short code | 174379 |
| `PASSKEY` | Safaricom passkey | (required) |
| `CALLBACK_URL` | Payment callback URL | (required) |

### CORS Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| `ALLOWED_ORIGINS` | Comma-separated allowed origins | localhost:5173,localhost:3000 |

## 🌍 Environment-Specific Setup

### Development
```bash
NODE_ENV=development
PORT=5000
DB_HOST=localhost
# Other development-specific settings...
```

### Production
```bash
NODE_ENV=production
PORT=80
DB_HOST=your-production-db-host
# Use strong passwords and secure secrets
# Enable HTTPS-only cookies
# Configure production CORS origins
```

## 🗂️ File Structure
```
ConsiousCart/
├── .env.example                 # Environment template
├── .gitignore                   # Excludes .env files
├── database_schema.sql          # Database setup
├── Backend_logic/
│   ├── .env                     # Environment variables (not in git)
│   ├── .env.example            # Environment template
│   ├── config/
│   │   ├── db.js               # Database configuration
│   │   └── config.js           # Application configuration
│   └── SERVER.js               # Main server file
└── src/                        # Frontend source code
```

## 🔍 Troubleshooting

### Database Connection Issues
1. **Check MySQL service**: `sudo systemctl status mysql`
2. **Verify credentials**: Ensure DB_USER and DB_PASSWORD are correct
3. **Check database exists**: `sudo mysql -e "SHOW DATABASES;"`
4. **Test connection**: `mysql -h localhost -u root -p consiouscart`

### Port Already in Use
```bash
# Find process using port
lsof -i :5000

# Kill process
kill PID_NUMBER
```

### Environment Variables Not Loading
1. **Check .env file location**: Should be in `Backend_logic/.env`
2. **Verify file format**: No spaces around `=` sign
3. **Check for BOM**: Ensure file is UTF-8 without BOM
4. **Restart server**: Environment changes require server restart

### Rate Limiting Errors
- Ensure rate limit values are numbers, not strings
- Check that windowMs values are valid integers
- Verify rate limit configuration in .env file

## 📝 Best Practices

### Security
- Never commit `.env` files to version control
- Use strong, unique secrets for JWT and sessions
- Regularly rotate API keys and secrets
- Use different credentials for different environments

### Development
- Use `.env.example` as a template for team members
- Document any new environment variables
- Test with different environment configurations
- Use meaningful variable names and comments

### Production
- Use a proper secret management system
- Enable HTTPS in production
- Configure proper CORS origins
- Set up monitoring and logging
- Use environment-specific database credentials

## 🚨 Important Notes

1. **Never commit `.env` files**: They contain sensitive information
2. **Always use `.env.example`**: Keep it updated with new variables
3. **Validate environment variables**: Check for required variables on startup
4. **Use strong secrets**: Generate cryptographically secure random strings
5. **Test configurations**: Verify different environment setups work correctly

## 📞 Support

If you encounter issues with environment configuration:
1. Check the troubleshooting section above
2. Verify all required variables are set
3. Ensure database is running and accessible
4. Check server logs for detailed error messages

---

**Last Updated**: October 2025
**Version**: 1.0.0