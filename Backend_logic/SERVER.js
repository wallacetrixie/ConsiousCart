const express = require("express");
const session = require("express-session");
require("dotenv").config();
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
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: "Too many login attempts. Please try again later.",
});
//middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict", 
      maxAge: 3600000,
    },
  })
);
// Register Route
app.post("/register", (req, res) => {
  const { username, password, confirmPassword } = req.body;
  const isStrongPassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.",
    });
  }
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    if (result.length > 0) {
      return res
        .status(400)
        .json({ message: "Username already exists, try again" });
    }
    try {
      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserQuery =
        "INSERT INTO users (username, password) VALUES (?, ?)";
      db.query(insertUserQuery, [username, hashedPassword], (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }
        res.json({
          success: true,
          message: "User registered successfully",
          redirectUrl: "/tasks",
        });
      });
    } catch (hashError) {
      res
        .status(500)
        .json({ message: "Error hashing password", error: hashError.message });
    }
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

// Get Username
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


//products and product details categories
// Get all categories
app.get("/api/categories", (req, res) => {
  db.query("SELECT * FROM categories ORDER BY id ASC", (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});


// Get products by category
app.get("/api/products/:categoryId", (req, res) => {
    const { categoryId } = req.params;
    db.query("SELECT * FROM products WHERE category_id = ?", [categoryId], (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// Get product details by ID
app.get("/api/product/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.json(result[0]);
    });
});


app.listen(5000, () => {
  console.log("Server started on port 5000");
});
