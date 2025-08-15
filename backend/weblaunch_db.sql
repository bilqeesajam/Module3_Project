-- Create Database --
CREATE SCHEMA IF NOT EXISTS `weblaunch_db`;
USE `weblaunch_db`;

-- Create Users Table --
CREATE TABLE IF NOT EXISTS `weblaunch_db`.`users` (
    `user_id` INT PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email_address` VARCHAR(60) NOT NULL UNIQUE,
    `phone_number` VARCHAR(20) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'consumer') DEFAULT 'consumer',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Orders Table --
CREATE TABLE IF NOT EXISTS `weblaunch_db`.`orders` (
    `order_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `package_type` ENUM('starter', 'professional', 'business plus') NOT NULL,
    `requirements` TEXT NOT NULL,
    `status` ENUM('in progress', 'completed') DEFAULT 'in progress',
    `price` DECIMAL(10,2) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add Index and Foreign Key to Orders --
ALTER TABLE `weblaunch_db`.`orders`
    ADD INDEX `idx_orders_user_id` (`user_id`),
    ADD CONSTRAINT `FK_orders_user`
        FOREIGN KEY (`user_id`)
        REFERENCES `weblaunch_db`.`users` (`user_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

-- Create Courses Table --
CREATE TABLE IF NOT EXISTS `weblaunch_db`.`courses` (
    `course_id` INT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `icon` VARCHAR(150) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `details` VARCHAR(150) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Enrollments Table --
CREATE TABLE IF NOT EXISTS `weblaunch_db`.`enrollments` (
    `enrollment_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `course_id` INT NOT NULL,
    `progress` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    `status` ENUM('active', 'completed', 'dropped'),
    `enrolled_at` DATETIME
);

-- Add Indexes and Foreign Keys to Enrollments --
ALTER TABLE `weblaunch_db`.`enrollments`
    ADD INDEX `idx_enrollments_user_id` (`user_id`),
    ADD INDEX `idx_enrollments_course_id` (`course_id`),
    ADD CONSTRAINT `FK_enrollments_user`
        FOREIGN KEY (`user_id`)
        REFERENCES `weblaunch_db`.`users` (`user_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    ADD CONSTRAINT `FK_enrollments_course`
        FOREIGN KEY (`course_id`)
        REFERENCES `weblaunch_db`.`courses` (`course_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

-- Create Payments Table --
CREATE TABLE IF NOT EXISTS `weblaunch_db`.`payments` (
    `payment_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `order_id` INT NULL,
    `course_id` INT NULL,
    `amount_paid` DECIMAL(10,2) NOT NULL,
    `payment_method` ENUM('card', 'eft', 'wallet') NOT NULL,
    `status` ENUM('pending', 'completed', 'failed') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add Indexes and Foreign Keys to Payments --
ALTER TABLE `weblaunch_db`.`payments`
    ADD INDEX `idx_payments_user_id` (`user_id`),
    ADD INDEX `idx_payments_order_id` (`order_id`),
    ADD INDEX `idx_payments_course_id` (`course_id`),
    ADD CONSTRAINT `FK_payments_user`
        FOREIGN KEY (`user_id`)
        REFERENCES `weblaunch_db`.`users` (`user_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    ADD CONSTRAINT `FK_payments_order`
        FOREIGN KEY (`order_id`)
        REFERENCES `weblaunch_db`.`orders` (`order_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    ADD CONSTRAINT `FK_payments_course`
        FOREIGN KEY (`course_id`)
        REFERENCES `weblaunch_db`.`courses` (`course_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE;
        
-- Populate Users

INSERT INTO `weblaunch_db`.`users` (username, email_address, phone_number, password, role)
VALUES
('bilal_admin', 'bilal.khan@weblaunch.com', '0710000001', '$2b$10$tfXHEzjbnR/6stfkBRjh7OMYsKYFkBh0a0I6taiztp23rTAIwQqFW', 'admin'),
('sarah_m', 'sarah.meyer@gmail.com', '0710000002', '$2b$10$Pr65BTMJqljhv9mB0XPt3eC70Y2QkTV2X1szw4nqjkPdsS0KKNGI6', 'consumer'),
('thabo_d', 'thabo.dlamini@yahoo.com', '0710000003', '$2b$10$SBzwccIPfQj68KThTaml.usqH6J.sKALwQJKXIw.As8IGkXqP4kGG', 'consumer'),
('amy_lee', 'amy.lee@hotmail.com', '0710000004', '$2b$10$3XpQbYhfUAepXG9hPr8zfuUH7jF5CVLI2eGMlrERKKrlpzVnsBKRe', 'consumer'),
('john_smith', 'john.smith@gmail.com', '0710000005', '$2b$10$usezbbtAZDjYbs73RURhl.iEktesKpCIfm0ftiIE6GgDZRxsGSnkW', 'consumer'),
('fatima_p', 'fatima.patel@outlook.com', '0710000006', '$2b$10$htnqtobvzXuqZANdpCe6q.1ceoyMS1oHmeqtrNzkdYR4BuLGuoRP2', 'consumer'),
('michael_b', 'michael.brown@yahoo.com', '0710000007', '$2b$10$DLi9./Dyu/V6h7oxThWzrOwFxLh/rBtfED3Omte/PEa1gFBhEPi7a', 'consumer'),
('linda_v', 'linda.vanrensburg@gmail.com', '0710000008', '$2b$10$GIWijtNdc//K.EYc/.bpn.ktJXddv9MINawd/OspNFbdC29XT3Mai', 'consumer'),
('kevin_r', 'kevin.ross@gmail.com', '0710000009', '$2b$10$FWf5O8u6j48qPjj0QIyasOSDCzykhBO1ukqGJfXGgaYSl1EXxR9iq', 'consumer'),
('nadia_k', 'nadia.khan@webmail.com', '0710000010', '$2b$10$btZ6hM2bofosewXdi5/TdecFzEl65/EVTrPUdsqQmsTaCRQbWC0Bu', 'consumer');

-- Populate Orders

INSERT INTO `weblaunch_db`.`orders` (user_id, package_type, requirements, status, price)
VALUES
(5, 'starter', 'Basic company website with contact form', 'in progress', 1500.00),
(6, 'professional', 'Business portfolio site with blog', 'in progress', 5000.00),
(7, 'business plus', 'Online shop with 50 products', 'completed', 12000.00),
(8, 'starter', 'Personal blog setup', 'in progress', 1000.00),
(9, 'professional', 'Restaurant website with booking system', 'completed', 7500.00),
(10, 'starter', 'Artist portfolio site', 'in progress', 2000.00),
(5, 'business plus', 'Shop with payment gateway', 'completed', 11000.00),
(6, 'professional', 'Corporate intranet portal', 'in progress', 8500.00),
(7, 'starter', 'Landing page for campaign', 'completed', 900.00),
(8, 'business plus', 'Fashion store with payment and delivery tracking', 'in progress', 13000.00);

-- Populate Courses

INSERT INTO `weblaunch_db`.`courses` (title, description, price, icon, image, details)
VALUES
('HTML', 'Learn the fundamentals of HTML.', 400.00, "bx bxl-html5", "https://nestify.io/wp-content/uploads/2024/01/What-is-HTML.jpg", '30 hours of content|5 real-world projects|Certificate of completion'),
('CSS', 'Learn how to style websites using CSS.', 500.00, "bx bxs-file-css", "https://www.syncfusion.com/blogs/wp-content/uploads/2024/09/5-Modern-CSS-Styles-You-Should-Know-In-2024.jpg", '35 hours of content|Flexbox and Grid|Animations workshop'),
('JavaScript', 'Interactive web development with JavaScript.', 800.00, "bx bxl-javascript", "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg", '50 hours of content|ES6+ features|10 practical projects'),
('Node.js and Express', 'Backend development with Node.js and Express framework.', 1200.00, "bx bxl-nodejs", "https://webandcrafts.com/_next/image?url=https%3A%2F%2Fadmin.wac.co%2Fuploads%2FNode_js_Architecture_A_Comprehensive_Guide_1_af37a73e1e.png&w=4500&q=90", '50 hours of content|Build REST APIs|Authentication systems'),
('PHP', 'Learn frontend and backend development using PHP.', 900.00, "bx bxl-php", "https://kinsta.com/wp-content/uploads/2023/10/PHP_Feature-Image-1024x536.jpg", '45 hours of content|Laravel framework|CMS development'),
('Vue.js', 'Frontend JavaScript framework for building UIs.', 1000.00, "bx bxl-vue.js", "https://api.next.otakoyi.software/uploads/vuejs_and_seo_your_steps_to_take_to_become_more_seo_friendly_317x237_76f8b1d078.png", '40 hours of content|State management|Real-world projects');

-- Populate Enrollments

INSERT INTO `weblaunch_db`.`enrollments` (user_id, course_id, progress, status, enrolled_at)
VALUES
(2, 1, 25.00, 'active', NOW()),
(3, 2, 100.00, 'completed', NOW()),
(4, 3, 50.00, 'active', NOW()),
(2, 4, 0.00, 'active', NOW()),
(3, 5, 75.00, 'active', NOW()),
(4, 6, 100.00, 'completed', NOW()),
(2, 3, 10.00, 'active', NOW()),
(3, 1, 0.00, 'active', NOW()),
(4, 2, 80.00, 'completed', NOW()),
(2, 3, 20.00, 'active', NOW());

-- Populate Payments

INSERT INTO `weblaunch_db`.`payments` (user_id, order_id, course_id, amount_paid, payment_method, status)
VALUES
(5, 1, NULL, 1500.00, 'card', 'completed'),
(6, 2, NULL, 5000.00, 'eft', 'completed'),
(7, 3, NULL, 12000.00, 'wallet', 'completed'),
(8, 4, NULL, 1000.00, 'card', 'pending'),
(9, 5, NULL, 7500.00, 'eft', 'completed'),
(10, 6, NULL, 2000.00, 'wallet', 'completed'),
(5, 2, NULL, 11000.00, 'card', 'completed'),
(6, 8, NULL, 8500.00, 'eft', 'pending'),
(2, NULL, 1, 400.00, 'card', 'completed'),
(3, NULL, 3, 800.00, 'eft', 'completed');