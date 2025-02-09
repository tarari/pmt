CREATE DATABASE practices_management;

USE practices_management;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  group_name VARCHAR(50)
);

CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  deadline DATE
);

CREATE TABLE progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  activity_id INT,
  status ENUM('Not Started', 'In Progress', 'Completed') DEFAULT 'Not Started',
  score FLOAT,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (activity_id) REFERENCES activities(id)
);