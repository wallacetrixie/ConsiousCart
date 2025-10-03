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
    image_url VARCHAR(500), -- For external images (Unsplash, etc.)
    shipping_info TEXT,
    social_media_sharing VARCHAR(500),
    stock_quantity INT DEFAULT 0,
    is_organic BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    sustainability_rating INT DEFAULT 0, -- 1-5 rating
    average_rating DECIMAL(3,2) DEFAULT 0.00, -- Calculated from reviews
    total_reviews INT DEFAULT 0,
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

-- Insert sample categories (updated for Kenyan market)
INSERT INTO categories (name, description, icon) VALUES
('Fruits & Vegetables', 'Fresh organic fruits and tropical produce', 'leaf'),
('Fresh Vegetables', 'Locally sourced fresh vegetables', 'leaf'),
('Dairy & Eggs', 'Fresh dairy products and free-range eggs', 'home'),
('Grains & Cereals', 'Traditional and organic grains', 'wheat'),
('Nuts & Seeds', 'Premium nuts and seeds from local farms', 'nut'),
('Oils & Condiments', 'Cooking oils and natural condiments', 'bottle'),
('Healthy Beverages', 'Natural drinks and herbal teas', 'cup'),
('Supplements', 'Natural health supplements', 'heart'),
('Natural Skincare', 'Organic skincare products', 'flower'),
('Eco Cleaning', 'Environment-friendly cleaning products', 'clean');

-- Insert Kenyan products with realistic data
INSERT INTO products (name, description, price, original_price, category_id, image_url, stock_quantity, is_organic, is_new, is_trending, average_rating, total_reviews) VALUES

-- Fruits & Vegetables (category_id = 1)
('Organic Avocados', 'Fresh, creamy organic avocados from Murang''a farms. Perfect for salads and toast.', 150.00, 200.00, 1, 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=250&fit=crop&q=80', 45, 1, 0, 1, 4.8, 124),
('Mango (Tommy Atkins)', 'Sweet and juicy Tommy Atkins mangoes from Kilifi County.', 80.00, NULL, 1, 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=250&fit=crop&q=80', 60, 0, 1, 0, 4.7, 89),
('Passion Fruits (1kg)', 'Aromatic passion fruits perfect for juices and desserts.', 250.00, 300.00, 1, 'https://images.unsplash.com/photo-1594736797933-d0a9ba6ba089?w=300&h=250&fit=crop&q=80', 35, 1, 0, 1, 4.6, 67),
('Bananas (Cooking - 1 bunch)', 'Fresh cooking bananas ideal for Kenyan traditional dishes.', 120.00, NULL, 1, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=250&fit=crop&q=80', 80, 0, 0, 0, 4.5, 156),
('Pineapples (Sweet Cayenne)', 'Sweet and tangy pineapples from Thika farms.', 180.00, 220.00, 1, 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300&h=250&fit=crop&q=80', 25, 1, 0, 1, 4.8, 203),

-- Fresh Vegetables (category_id = 2)
('Fresh Spinach Bundle', 'Nutrient-rich fresh spinach leaves, locally sourced from Kiambu.', 50.00, NULL, 2, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=250&fit=crop&q=80', 100, 1, 1, 0, 4.6, 89),
('Sukuma Wiki (Kales)', 'Fresh sukuma wiki (collard greens) - a Kenyan staple vegetable.', 30.00, NULL, 2, 'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=300&h=250&fit=crop&q=80', 150, 0, 0, 1, 4.4, 234),
('Carrots (1kg)', 'Crisp and sweet carrots perfect for cooking and salads.', 100.00, 120.00, 2, 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=300&h=250&fit=crop&q=80', 75, 1, 0, 0, 4.5, 145),
('Tomatoes (1kg)', 'Fresh, juicy tomatoes ideal for cooking and salads.', 80.00, NULL, 2, 'https://images.unsplash.com/photo-1546094096-0ec07656ac56?w=300&h=250&fit=crop&q=80', 90, 0, 0, 0, 4.3, 178),
('Onions (1kg)', 'Quality onions essential for Kenyan cuisine.', 120.00, 150.00, 2, 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=250&fit=crop&q=80', 65, 0, 0, 0, 4.2, 98),

-- Dairy & Eggs (category_id = 3)
('Fresh Cow Milk (1L)', 'Fresh organic cow milk from local farms in Nakuru.', 60.00, NULL, 3, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=250&fit=crop&q=80', 120, 1, 0, 1, 4.7, 156),
('Free Range Eggs (12 pieces)', 'Fresh free-range eggs from happy hens.', 350.00, 400.00, 3, 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=250&fit=crop&q=80', 85, 1, 1, 1, 4.8, 267),
('Natural Yogurt (500ml)', 'Creamy natural yogurt made from organic milk.', 120.00, NULL, 3, 'https://images.unsplash.com/photo-1571212515416-b01c1ee5ca75?w=300&h=250&fit=crop&q=80', 55, 1, 0, 0, 4.5, 134),
('Fresh Cream (250ml)', 'Rich and creamy fresh cream for cooking and desserts.', 180.00, 220.00, 3, 'https://images.unsplash.com/photo-1563379091338-d3dfcb120d10?w=300&h=250&fit=crop&q=80', 40, 0, 0, 0, 4.6, 89),

-- Grains & Cereals (category_id = 4)
('White Maize Flour (2kg)', 'High-quality white maize flour for ugali and baking.', 150.00, NULL, 4, 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=250&fit=crop&q=80', 200, 0, 0, 1, 4.4, 203),
('Brown Rice (1kg)', 'Nutritious brown rice, locally grown in Mwea.', 200.00, 250.00, 4, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=250&fit=crop&q=80', 70, 1, 1, 0, 4.7, 167),
('Millet Flour (1kg)', 'Nutritious millet flour perfect for porridge and baking.', 180.00, NULL, 4, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=250&fit=crop&q=80', 60, 1, 0, 1, 4.5, 92),
('Whole Wheat Flour (2kg)', 'Organic whole wheat flour for healthy baking.', 220.00, 280.00, 4, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=250&fit=crop&q=80', 80, 1, 0, 0, 4.6, 134),

-- Nuts & Seeds (category_id = 5)
('Groundnuts/Peanuts (500g)', 'Fresh groundnuts from Busia County, perfect for snacking.', 250.00, 300.00, 5, 'https://images.unsplash.com/photo-1566575055726-5a5de820fe46?w=300&h=250&fit=crop&q=80', 45, 0, 0, 1, 4.5, 78),
('Macadamia Nuts (250g)', 'Premium macadamia nuts from Murang''a farms.', 800.00, 1000.00, 5, 'https://images.unsplash.com/photo-1546618542-4d9e4f3e6f8c?w=300&h=250&fit=crop&q=80', 30, 1, 1, 1, 4.8, 145),
('Sunflower Seeds (300g)', 'Roasted sunflower seeds, rich in nutrients.', 180.00, NULL, 5, 'https://images.unsplash.com/photo-1602542367115-6e601dd1cf74?w=300&h=250&fit=crop&q=80', 50, 1, 0, 0, 4.4, 67),

-- Oils & Condiments (category_id = 6)
('Sunflower Cooking Oil (1L)', 'Pure sunflower cooking oil for all your cooking needs.', 280.00, 320.00, 6, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=250&fit=crop&q=80', 95, 0, 0, 0, 4.3, 234),
('Extra Virgin Olive Oil (500ml)', 'Premium extra virgin olive oil, cold-pressed and organic.', 1200.00, 1500.00, 6, 'https://images.unsplash.com/photo-1506629905952-eb693e19a369?w=300&h=250&fit=crop&q=80', 25, 1, 1, 1, 4.8, 167),
('Coconut Oil (500ml)', 'Pure coconut oil from coastal Kenya, perfect for cooking and skin care.', 450.00, NULL, 6, 'https://images.unsplash.com/photo-1626947337699-c4b321e9c0b6?w=300&h=250&fit=crop&q=80', 40, 1, 0, 1, 4.6, 156),

-- Healthy Beverages (category_id = 7)
('Fresh Orange Juice (1L)', 'Freshly squeezed orange juice with no added sugar.', 200.00, 250.00, 7, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=250&fit=crop&q=80', 60, 1, 0, 1, 4.7, 192),
('Green Tea (50 bags)', 'Premium green tea from Kericho highlands.', 350.00, NULL, 7, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=250&fit=crop&q=80', 75, 1, 1, 0, 4.5, 134),
('Baobab Powder (200g)', 'Superfood baobab powder perfect for smoothies and drinks.', 600.00, 750.00, 7, 'https://images.unsplash.com/photo-1623428454614-abaf00244e52?w=300&h=250&fit=crop&q=80', 35, 1, 1, 1, 4.8, 89),

-- Supplements (category_id = 8)
('Moringa Powder (100g)', 'Nutrient-rich moringa powder from local farms.', 400.00, 500.00, 8, 'https://images.unsplash.com/photo-1556767576-5ec22f8c4ffe?w=300&h=250&fit=crop&q=80', 50, 1, 0, 1, 4.7, 156),
('Spirulina Tablets (60 pieces)', 'High-quality spirulina tablets for daily nutrition.', 800.00, 1000.00, 8, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=250&fit=crop&q=80', 40, 1, 1, 1, 4.6, 134),

-- Natural Skincare (category_id = 9)
('Shea Butter (200g)', 'Pure shea butter for natural skin moisturizing.', 350.00, 450.00, 9, 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=250&fit=crop&q=80', 65, 1, 0, 1, 4.8, 234),
('Aloe Vera Gel (250ml)', 'Pure aloe vera gel for skin healing and moisturizing.', 280.00, NULL, 9, 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=250&fit=crop&q=80', 45, 1, 1, 0, 4.5, 167),

-- Eco Cleaning (category_id = 10)
('Natural Dish Soap (500ml)', 'Eco-friendly dish soap that''s gentle on hands and environment.', 180.00, 220.00, 10, 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=250&fit=crop&q=80', 85, 0, 0, 0, 4.4, 145),
('Bamboo Cleaning Cloths (5 pack)', 'Sustainable bamboo cleaning cloths, reusable and eco-friendly.', 250.00, 300.00, 10, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=250&fit=crop&q=80', 55, 0, 1, 1, 4.6, 89);

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