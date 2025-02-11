import * as dotenv from 'dotenv';
process=dotenv.config();
console.log(process.env.app.url);
const url_env=process.env.app.url;
async function fetchStudents() {
  const url=url_env+":5001/students";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error obtenint alumnes');
    const students = await response.json();
    console.log(students); // Mostrar alumnes al navegador (debug)
  } catch (error) {
    console.error(error);
  }
}

fetchStudents(); 