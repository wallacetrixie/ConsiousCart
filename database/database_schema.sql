-- ConsiousCart Database Schema
-- Database: consiouscart
-- Based on code analysis from the ConsiousCart application

-- Create database
CREATE DATABASE IF NOT EXISTS consiouscart;
USE consiouscart;

-- =============================================
-- USERS TABLE
-- =============================================
-- Stores user authentication and profile information
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- CATEGORIES TABLE
-- =============================================
-- Stores product categories (Sustainable Groceries, Eco-Friendly Home & Kitchen, etc.)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- PRODUCTS TABLE
-- =============================================
-- Stores all product information including eco-friendly products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    category_id INT NOT NULL,
    image_key VARCHAR(255),
    images TEXT, -- JSON or comma-separated list of image paths
    shipping_info TEXT,
    social_media_sharing VARCHAR(500),
    stock_quantity INT DEFAULT 0,
    is_organic BOOLEAN DEFAULT FALSE,
    sustainability_rating INT DEFAULT 0, -- 1-5 rating
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- =============================================
-- ORDERS TABLE
-- =============================================
-- Stores customer orders (cart items that have been checked out)
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- =============================================
-- PAYMENTS TABLE
-- =============================================
-- Stores M-Pesa payment transactions
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    merchantRequestID VARCHAR(255),
    checkoutRequestID VARCHAR(255),
    mpesaReceiptNumber VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    resultDesc TEXT,
    payment_status ENUM('pending', 'success', 'failed', 'cancelled') DEFAULT 'pending',
    user_id INT,
    order_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- =============================================
-- CART TABLE (Optional - for persistent cart storage)
-- =============================================
-- Stores items in user's cart before checkout
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- =============================================
-- PRODUCT_REVIEWS TABLE (Future Enhancement)
-- =============================================
-- Stores customer reviews and ratings for products
CREATE TABLE product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product_review (user_id, product_id)
);

-- =============================================
-- WISHLIST TABLE (Future Enhancement)
-- =============================================
-- Stores user's wishlist items
CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_wishlist (user_id, product_id)
);

-- =============================================
-- SAMPLE DATA INSERTS
-- =============================================

-- Insert sample categories
INSERT INTO categories (name, description, icon) VALUES
('Sustainable Groceries', 'Organic and eco-friendly food products', 'leaf'),
('Eco-Friendly Home & Kitchen', 'Sustainable household and kitchen items', 'home'),
('Health & Wellness', 'Natural health and wellness products', 'heart'),
('Smart & Sustainable Tech', 'Energy-efficient and eco-friendly technology', 'lightning');

-- Insert sample products (based on the image keys found in the code)
INSERT INTO products (name, description, price, original_price, category_id, image_key, shipping_info, sustainability_rating) VALUES
-- Sustainable Groceries
('Organic Dairy Products', 'Fresh organic milk, cheese, and yogurt', 850.00, 1000.00, 1, 'dairy', 'Free delivery within 24 hours. Keep refrigerated.', 5),
('Fresh Organic Fruits', 'Seasonal organic fruits directly from local farms', 650.00, 750.00, 1, 'fruits', 'Same day delivery for fresh produce', 5),
('Organic Vegetables', 'Fresh organic vegetables grown without pesticides', 450.00, 550.00, 1, 'vegies', 'Delivered fresh daily', 5),
('Organic Grains & Cereals', 'Whole grain cereals and organic grains', 380.00, 450.00, 1, 'grains', 'Long shelf life, delivered within 3 days', 4),
('Organic Nuts & Seeds', 'Premium quality organic nuts and seeds', 1200.00, 1400.00, 1, 'nuts', 'Vacuum sealed for freshness', 4),
('Natural Energy Drinks', 'Organic energy drinks with natural ingredients', 320.00, 400.00, 1, 'energy', 'Best consumed fresh, 2-day delivery', 4),
('Healthy Beverages', 'Natural and organic drink options', 280.00, 350.00, 1, 'drinks', 'Keep in cool dry place', 4),
('Leafy Greens', 'Fresh organic leafy vegetables', 250.00, 300.00, 1, 'greens', 'Delivered fresh within 24 hours', 5),

-- Eco-Friendly Home & Kitchen
('Bamboo Utensils Set', 'Sustainable bamboo kitchen utensils', 890.00, 1100.00, 2, 'bamboo', 'Durable and dishwasher safe', 5),
('Reusable Water Bottles', 'BPA-free reusable water bottles', 750.00, 900.00, 2, 'bottle', 'Leak-proof design, 5-year warranty', 5),
('Eco-Friendly Cleaning Supplies', 'Non-toxic biodegradable cleaning products', 650.00, 800.00, 2, 'cleaning', 'Safe for families and pets', 5),
('Organic Cotton Cloth', 'Sustainable organic cotton textiles', 1250.00, 1500.00, 2, 'cloth', 'Machine washable, long-lasting', 4),
('Compost Bins', 'Home composting solutions', 2800.00, 3200.00, 2, 'compost', 'Easy setup, instruction manual included', 5),
('Eco Dishwasher Tablets', 'Phosphate-free dishwasher tablets', 480.00, 600.00, 2, 'dishwasher', 'Biodegradable packaging', 4),
('Natural Soap Bars', 'Handmade organic soap bars', 350.00, 450.00, 2, 'soap', 'Made with natural ingredients', 4),
('Reusable Shopping Bags', 'Durable eco-friendly shopping bags', 420.00, 500.00, 2, 'bags', 'Machine washable, foldable design', 5),

-- Health & Wellness
('Herbal Supplements', 'Natural herbal health supplements', 1850.00, 2200.00, 3, 'herbal', 'Consult healthcare provider before use', 4),
('Essential Oils Collection', 'Pure organic essential oils', 1650.00, 2000.00, 3, 'oils', 'Store in cool, dark place', 4),
('Natural Skincare Products', 'Organic skincare and beauty products', 1280.00, 1600.00, 3, 'skin', 'Suitable for all skin types', 4),
('Vitamin Supplements', 'Natural vitamin and mineral supplements', 920.00, 1200.00, 3, 'vitamins', 'Take as directed by healthcare provider', 4),
('Dietary Supplements', 'Organic dietary supplements for health', 1100.00, 1400.00, 3, 'supplements', 'Store in dry place, check expiry date', 4),
('Toxin-Free Personal Care', 'Natural personal care products', 780.00, 950.00, 3, 'toxin', 'Free from harmful chemicals', 5),
('Workout Equipment', 'Eco-friendly fitness equipment', 3500.00, 4200.00, 3, 'workout', 'Assembly instructions included', 3),
('Yoga Accessories', 'Sustainable yoga mats and accessories', 2100.00, 2600.00, 3, 'yoga', 'Non-slip, eco-friendly materials', 4),

-- Smart & Sustainable Tech
('LED Energy Bulbs', 'Energy-efficient LED lighting solutions', 450.00, 600.00, 4, 'bulbs', 'Long-lasting, low energy consumption', 5),
('Solar Chargers', 'Portable solar phone chargers', 2800.00, 3400.00, 4, 'charger', 'Works with most devices, weather resistant', 4),
('Eco Headphones', 'Sustainable wireless headphones', 3500.00, 4200.00, 4, 'headphones', 'High quality sound, recyclable materials', 3),
('Eco-Friendly Laptop', 'Energy-efficient laptops with sustainable materials', 45000.00, 55000.00, 4, 'laptop', 'High performance, low power consumption', 3),
('Smart Watches', 'Energy-efficient smart wearables', 8500.00, 11000.00, 4, 'smartwatch', 'Health tracking, long battery life', 3),
('Solar Panel Kits', 'Home solar energy solutions', 25000.00, 32000.00, 4, 'solar', 'Professional installation recommended', 5),
('Bluetooth Speakers', 'Eco-friendly wireless speakers', 2200.00, 2800.00, 4, 'speakers', 'Superior sound quality, sustainable design', 3),
('Smart Thermostats', 'Energy-saving smart home thermostats', 5500.00, 7000.00, 4, 'thermostat', 'Reduces energy consumption by up to 20%', 4);

-- =============================================
-- INDEXES FOR BETTER PERFORMANCE
-- =============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_payments_receipt ON payments(mpesaReceiptNumber);
CREATE INDEX idx_cart_user ON cart(user_id);
CREATE INDEX idx_reviews_product ON product_reviews(product_id);
CREATE INDEX idx_reviews_rating ON product_reviews(rating);

-- =============================================
-- VIEWS FOR COMMON QUERIES
-- =============================================

-- View for products with category information
CREATE VIEW product_details AS
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.original_price,
    p.image_key,
    p.shipping_info,
    p.stock_quantity,
    p.sustainability_rating,
    c.name AS category_name,
    c.description AS category_description
FROM products p
JOIN categories c ON p.category_id = c.id;

-- View for order summary
CREATE VIEW order_summary AS
SELECT 
    o.id,
    o.user_id,
    u.name AS customer_name,
    u.email AS customer_email,
    o.product_name,
    o.quantity,
    o.price,
    o.total_price,
    o.order_status,
    o.created_at AS order_date
FROM orders o
JOIN users u ON o.user_id = u.id;

-- =============================================
-- TRIGGERS FOR DATA INTEGRITY
-- =============================================

-- Trigger to update total_price when order quantity or price changes
DELIMITER //
CREATE TRIGGER update_order_total
    BEFORE UPDATE ON orders
    FOR EACH ROW
BEGIN
    SET NEW.total_price = NEW.quantity * NEW.price;
END//
DELIMITER ;

-- Trigger to set total_price on insert
DELIMITER //
CREATE TRIGGER set_order_total_on_insert
    BEFORE INSERT ON orders
    FOR EACH ROW
BEGIN
    SET NEW.total_price = NEW.quantity * NEW.price;
END//
DELIMITER ;

-- =============================================
-- STORED PROCEDURES (Optional)
-- =============================================

-- Procedure to get user's order history
DELIMITER //
CREATE PROCEDURE GetUserOrderHistory(IN userId INT)
BEGIN
    SELECT 
        o.id,
        o.product_name,
        o.quantity,
        o.price,
        o.total_price,
        o.order_status,
        o.created_at
    FROM orders o
    WHERE o.user_id = userId
    ORDER BY o.created_at DESC;
END//
DELIMITER ;

-- Procedure to get products by category with pagination
DELIMITER //
CREATE PROCEDURE GetProductsByCategory(
    IN categoryId INT,
    IN limitCount INT,
    IN offsetCount INT
)
BEGIN
    SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.original_price,
        p.image_key,
        p.sustainability_rating,
        c.name AS category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.category_id = categoryId
    ORDER BY p.created_at DESC
    LIMIT limitCount OFFSET offsetCount;
END//
DELIMITER ;

DELIMITER ;

-- =============================================
-- FINAL NOTES
-- =============================================
-- This schema includes:
-- 1. All tables identified from the codebase analysis
-- 2. Proper foreign key relationships
-- 3. Indexes for performance optimization
-- 4. Sample data based on the product images and categories found
-- 5. Views for common queries
-- 6. Triggers for data integrity
-- 7. Stored procedures for complex operations
-- 
-- Database: consiouscart
-- Charset: utf8mb4 (recommended for full UTF-8 support)
-- 
-- Remember to:
-- - Set up proper user permissions
-- - Configure backup procedures
-- - Implement proper error handling in your application
-- - Consider implementing database connection pooling