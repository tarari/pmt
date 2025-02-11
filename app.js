
const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
process.title="MyApp";

// Middleware
app.use(bodyParser.json());
app.use(cors())
// Connexió a la base de dades
const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

db.connect((err) => {
  if (err) throw err;
  console.log('Base de dades connectada!');
});

// 2. Mòdul de gestió d'alumnes
app.get('/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/students', (req, res) => {
  const student = req.body;
  const sql = 'INSERT INTO students SET ?';
  db.query(sql, student, (err, result) => {
    if (err) throw err;
    res.send({ message: 'Alumne afegit', id: result.insertId });
  });
});

// 3. Mòdul de gestió d'activitats
app.get('/activities', (req, res) => {
  const sql = 'SELECT * FROM activities';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/activities', (req, res) => {
  const activity = req.body;
  const sql = 'INSERT INTO activities SET ?';
  db.query(sql, activity, (err, result) => {
    if (err) throw err;
    res.send({ message: 'Activitat afegida', id: result.insertId });
  });
});

// 4. Seguiment del progrés
app.get('/progress/:studentId', (req, res) => {
  const { studentId } = req.params;
  const sql = `SELECT * FROM progress WHERE student_id = ?`;
  db.query(sql, [studentId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/progress', (req, res) => {
  const progress = req.body;
  const sql = 'INSERT INTO progress SET ?';
  db.query(sql, progress, (err, result) => {
    if (err) throw err;
    res.send({ message: 'Progrés actualitzat', id: result.insertId });
  });
});

// Servidor en execució
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor executant-se a http://localhost:${PORT}`);
});

// Disseny de la base de dades
/*
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
*/

// package.json
/*
{
  "name": "practices-management-tool",
  "version": "1.0.0",
  "description": "Eina per a la gestió de pràctiques d'estudiants",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "body-parser": "^1.20.2",
    "mysql": "^2.18.1"
  }
}
*/
