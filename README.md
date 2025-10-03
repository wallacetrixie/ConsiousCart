# ConsciosCart

A conscious shopping platform that helps users make environmentally and socially responsible purchasing decisions.

## Project Structure

```
ConsciosCart/
├── frontend/          # React.js frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components (routes)
│   │   ├── styles/        # CSS stylesheets
│   │   ├── assets/        # Static assets (images, etc.)
│   │   └── tests/         # Frontend tests
│   ├── public/            # Public static files
│   └── package.json       # Frontend dependencies
├── backend/           # Node.js/Express backend API
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── tests/            # Backend tests
│   └── package.json      # Backend dependencies
├── database_schema.sql    # Database schema
└── package.json          # Root package.json with workspace scripts
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MySQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wallacetrixie/ConsciosCart.git
cd ConsciosCart
```

2. Install all dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in the backend directory
   - Configure your database connection and other settings

4. Set up the database:
   - Create a MySQL database
   - Run the `database_schema.sql` file to set up tables

### Development

To start both frontend and backend in development mode:
```bash
npm run dev
```

To start them separately:
```bash
# Frontend only (runs on http://localhost:5173)
npm run dev:frontend

# Backend only (runs on http://localhost:3000)
npm run dev:backend
```

### Production Build

```bash
# Build frontend for production
npm run build

# Start backend in production
npm run start:backend

# Serve frontend build
npm run start:frontend
```

## Features

- 🌱 Eco-friendly product catalog
- 🛒 Shopping cart functionality
- 👤 User authentication
- 💳 Payment integration
- 🤖 AI-powered recommendations
- 📱 Responsive design

## Tech Stack

**Frontend:**
- React 18
- React Router
- Vite
- CSS3

**Backend:**
- Node.js
- Express.js
- MySQL
- JWT Authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.