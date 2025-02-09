const dotenv = require('dotenv');
dotenv.config();

document.getElementById('addActivityForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const activity = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      deadline: document.getElementById('deadline').value,
    };
    const url=process.env.app.url+":5001/activities";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
      });

      if (!response.ok) throw new Error('Error afegint activitat');
      console.log('Activitat afegida correctament');
      fetchActivities();
    } catch (error) {
      console.error(error);
    }
  });

  async function fetchActivities() {
    try {
        const url=process.env.app.url+":5001/activities";

      const response = await fetch(url);
      if (!response.ok) throw new Error('Error obtenint activitats');
      const activities = await response.json();
      const tableBody = document.querySelector('#activitiesTable tbody');
      tableBody.innerHTML = '';

      activities.forEach((activity) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${activity.title}</td>
          <td>${activity.description}</td>
          <td>${activity.deadline}</td>
          <td><button onclick="deleteActivity(${activity.id})">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteActivity(id) {
    try {
        const url=process.env.app.url+":5001/activities";

      const response = await fetch(url + `${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error eliminant activitat');
      console.log('Activitat eliminada correctament');
      fetchActivities();
    } catch (error) {
      console.error(error);
    }
  }

  fetchActivities(); // Carrega inicial de les activitats
