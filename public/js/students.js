

document.getElementById('addStudentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const student = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      group_name: document.getElementById('group').value,
    };
  const url=window.location.origin+":5001/students";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });

      if (!response.ok) throw new Error('Error afegint estudiant');
      console.log('Estudiant afegit correctament');
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  });

  async function fetchStudents() {
    try {
      const url=window.location.origin+":5001/students";
      const response = await fetch(window.location.origin+":5001/students");
      if (!response.ok) throw new Error('Error obtenint estudiants');
      const students = await response.json();
      const tableBody = document.querySelector('#studentsTable tbody');
      tableBody.innerHTML = '';

      students.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.group}</td>
          <td><button onclick="deleteStudent(${student.id})">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteStudent(id) {
    try {
        const url=process.env.app.url+":5001/students";
      const response = await fetch(url + `${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error eliminant estudiant');
      console.log('Estudiant eliminat correctament');
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  }

  fetchStudents(); 