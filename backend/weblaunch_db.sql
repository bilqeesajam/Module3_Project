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
    `role` ENUM('admin', 'student', 'consumer') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Orders Table --
CREATE TABLE IF NOT EXISTS `weblaunch_db`.`orders` (
    `order_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `package_type` ENUM('starter', 'business', 'e-commerce') NOT NULL,
    `requirements` TEXT NOT NULL,
    `status` ENUM('pending', 'in progress', 'completed'),
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
    -- `level` ENUM('beginner','intermediate','advanced') NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Enrollments Table --
CREATE TABLE IF NOT EXISTS `weblaunch_db`.`enrollments` (
    `enrollment_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `course_id` INT NOT NULL,
    `progress` DECIMAL(5,2) NOT NULL,
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
('sarah_m', 'sarah.meyer@gmail.com', '0710000002', '$2b$10$Pr65BTMJqljhv9mB0XPt3eC70Y2QkTV2X1szw4nqjkPdsS0KKNGI6', 'student'),
('thabo_d', 'thabo.dlamini@yahoo.com', '0710000003', '$2b$10$SBzwccIPfQj68KThTaml.usqH6J.sKALwQJKXIw.As8IGkXqP4kGG', 'student'),
('amy_lee', 'amy.lee@hotmail.com', '0710000004', '$2b$10$3XpQbYhfUAepXG9hPr8zfuUH7jF5CVLI2eGMlrERKKrlpzVnsBKRe', 'student'),
('john_smith', 'john.smith@gmail.com', '0710000005', '$2b$10$usezbbtAZDjYbs73RURhl.iEktesKpCIfm0ftiIE6GgDZRxsGSnkW', 'consumer'),
('fatima_p', 'fatima.patel@outlook.com', '0710000006', '$2b$10$htnqtobvzXuqZANdpCe6q.1ceoyMS1oHmeqtrNzkdYR4BuLGuoRP2', 'consumer'),
('michael_b', 'michael.brown@yahoo.com', '0710000007', '$2b$10$DLi9./Dyu/V6h7oxThWzrOwFxLh/rBtfED3Omte/PEa1gFBhEPi7a', 'consumer'),
('linda_v', 'linda.vanrensburg@gmail.com', '0710000008', '$2b$10$GIWijtNdc//K.EYc/.bpn.ktJXddv9MINawd/OspNFbdC29XT3Mai', 'consumer'),
('kevin_r', 'kevin.ross@gmail.com', '0710000009', '$2b$10$FWf5O8u6j48qPjj0QIyasOSDCzykhBO1ukqGJfXGgaYSl1EXxR9iq', 'consumer'),
('nadia_k', 'nadia.khan@webmail.com', '0710000010', '$2b$10$btZ6hM2bofosewXdi5/TdecFzEl65/EVTrPUdsqQmsTaCRQbWC0Bu', 'consumer');

-- Populate Orders

INSERT INTO `weblaunch_db`.`orders` (user_id, package_type, requirements, status, price)
VALUES
(5, 'starter', 'Basic company website with contact form', 'pending', 1500.00),
(6, 'business', 'Business portfolio site with blog', 'in progress', 5000.00),
(7, 'e-commerce', 'Online shop with 50 products', 'completed', 12000.00),
(8, 'starter', 'Personal blog setup', 'pending', 1000.00),
(9, 'business', 'Restaurant website with booking system', 'completed', 7500.00),
(10, 'starter', 'Artist portfolio site', 'in progress', 2000.00),
(5, 'e-commerce', 'Shop with payment gateway', 'completed', 11000.00),
(6, 'business', 'Corporate intranet portal', 'pending', 8500.00),
(7, 'starter', 'Landing page for campaign', 'completed', 900.00),
(8, 'e-commerce', 'Fashion store with payment and delivery tracking', 'in progress', 13000.00);

-- Populate Courses

INSERT INTO `weblaunch_db`.`courses` (title, description, price)
VALUES
('HTML', 'Learn the fundamentals of HTML.', 400.00),
('CSS', 'Learn how to style websites using CSS.', 500.00),
('JavaScript', 'Interactive web development with JavaScript.', 800.00),
('Node.js and Express', 'Backend development with Node.js and Express framework.', 1200.00),
('PHP', 'Learn frontend and backend development using PHP.', 900.00),
('Vue.js', 'Frontend JavaScript framework for building UIs.', 1000.00),
('MySQL and APIs', 'Database management and building APIs.', 1100.00);

-- Populate Enrollments

INSERT INTO `weblaunch_db`.`enrollments` (user_id, course_id, progress, status, enrolled_at)
VALUES
(2, 1, 25.00, 'active', NOW()),
(3, 2, 100.00, 'completed', NOW()),
(4, 3, 50.00, 'active', NOW()),
(2, 4, 0.00, 'active', NOW()),
(3, 5, 75.00, 'active', NOW()),
(4, 6, 100.00, 'completed', NOW()),
(2, 7, 10.00, 'active', NOW()),
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
(5, 7, NULL, 11000.00, 'card', 'completed'),
(6, 8, NULL, 8500.00, 'eft', 'pending'),
(2, NULL, 1, 400.00, 'card', 'completed'),
(3, NULL, 3, 800.00, 'eft', 'completed');



