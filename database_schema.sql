-- Campus Shuttle Booking System Database Schema
-- No cancellation functionality included

-- Users table (for authentication and role management)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'driver', 'admin') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students table (extended profile for students)
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    mobile VARCHAR(20),
    university VARCHAR(100),
    home_address TEXT,
    parent_name VARCHAR(100),
    parent_email VARCHAR(100),
    parent_phone VARCHAR(20),
    total_bookings INT DEFAULT 0,
    join_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id)
);

-- Drivers table (extended profile for drivers)
CREATE TABLE drivers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    mobile VARCHAR(20),
    license_number VARCHAR(50) UNIQUE NOT NULL,
    vehicle_type VARCHAR(50),
    vehicle_number VARCHAR(50) UNIQUE NOT NULL,
    seats INT NOT NULL,
    total_trips INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    status ENUM('active', 'inactive') DEFAULT 'active',
    join_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id)
);

-- Shuttle routes table
CREATE TABLE shuttle_routes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bus_number VARCHAR(20) UNIQUE NOT NULL,
    driver_id INT,
    start_location VARCHAR(100) NOT NULL,
    end_location VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration VARCHAR(20),
    stops INT DEFAULT 0,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE SET NULL
);

-- Bookings table (no cancellation fields)
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    shuttle_route_id INT NOT NULL,
    selected_seats JSON NOT NULL, -- Array of seat numbers
    passenger_name VARCHAR(100) NOT NULL,
    passenger_email VARCHAR(100) NOT NULL,
    passenger_phone VARCHAR(20) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('confirmed', 'completed') DEFAULT 'confirmed',
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (shuttle_route_id) REFERENCES shuttle_routes(id) ON DELETE CASCADE
);

-- Payments table (for tracking payments)
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('card', 'cash', 'online') DEFAULT 'online',
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
    transaction_id VARCHAR(100),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Emergency reports table
CREATE TABLE emergency_reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    driver_id INT NOT NULL,
    shuttle_route_id INT,
    emergency_type VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    description TEXT,
    status ENUM('pending', 'in_progress', 'resolved') DEFAULT 'pending',
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE,
    FOREIGN KEY (shuttle_route_id) REFERENCES shuttle_routes(id) ON DELETE SET NULL
);

-- Route tracking table (for real-time tracking)
CREATE TABLE route_tracking (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    current_stop INT DEFAULT 1,
    eta VARCHAR(20),
    status ENUM('preparing', 'in_transit', 'approaching', 'arrived') DEFAULT 'preparing',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_bookings_student ON bookings(student_id);
CREATE INDEX idx_bookings_route ON bookings(shuttle_route_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_shuttle_routes_active ON shuttle_routes(is_active);
CREATE INDEX idx_emergency_reports_status ON emergency_reports(status);

-- Sample data insertion (optional)
-- INSERT INTO users (username, email, password_hash, role) VALUES
-- ('admin', 'admin@campus.edu', '$2b$10$hashedpassword', 'admin'),
-- ('student1', 'student1@campus.edu', '$2b$10$hashedpassword', 'student'),
-- ('driver1', 'driver1@campus.edu', '$2b$10$hashedpassword', 'driver');</content>
<parameter name="filePath">d:\Shuttle\campus-shuttle\database_schema.sql