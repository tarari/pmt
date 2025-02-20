
const url_env=window.location.origin;
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