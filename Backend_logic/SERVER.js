const express = require("express");
const session = require("express-session");
const db = require("./config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const SECRET_KEY = "yA%55G_9;;y7ttFFF%5VVeer547^^8gf5AAWJ88990OHHtvr5:</";

// Rate Limiting for Login Attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: "Too many login attempts. Please try again later.",
});

// Rate Limiting for Registration
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 registration attempts
  message: "Too many registration attempts. Please try again later.",
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    },
  })
);

// Strong Password Validation Function
const isStrongPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
};


// Register Route with Rate Limiting
app.post("/register", registerLimiter, (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Validate strong password policy
  if (!isStrongPassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.",
    });
  }

  // Check if user already exists
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], async (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.length > 0) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = "INSERT INTO users (username, password) VALUES (?, ?)";

    db.query(insertUserQuery, [username, hashedPassword], (err) => {
      if (err) return res.status(500).json({ message: "Database error" });

      // Return success response
      res.json({
        success: true,
        message: "Registration successful",
        redirectUrl: "/login", // Redirects user to the login page
      });
    });
  });
});


// Login Route with Rate Limiting
app.post("/login", loginLimiter, (req, res) => {
  const { username, password } = req.body;
  const findUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(findUserQuery, [username], async (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      success: true,
      token,
      message: "Login successful",
      redirectUrl: "/tasks",
    });
  });
});

// Get User Data
app.get("/user", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const findUserQuery = "SELECT username FROM users WHERE id = ?";
    db.query(findUserQuery, [decoded.id], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      if (result.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.json({ success: true, username: result[0].username });
    });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
