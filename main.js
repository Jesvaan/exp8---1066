const API_URL = 'http://localhost:3000/events';
const eventForm = document.getElementById('eventForm');
const eventTableBody = document.getElementById('eventTableBody');

// Load events when page loads
window.onload = fetchEvents;

function fetchEvents() {
  fetch(API_URL)
    .then(res => res.json())
    .then(events => {
      eventTableBody.innerHTML = '';
      events.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${event.name}</td>
          <td>${event.date ? event.date.substr(0, 10) : ''}</td>
          <td>${event.location}</td>
          <td>${event.description || ''}</td>
          <td><button onclick="deleteEvent('${event._id}')">Delete</button></td>
        `;
        eventTableBody.appendChild(row);
      });
    });
}

// Add new event
eventForm.onsubmit = function(e) {
  e.preventDefault();
  const event = {
    name: document.getElementById('name').value,
    date: document.getElementById('date').value,
    location: document.getElementById('location').value,
    description: document.getElementById('description').value
  };
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  })
  .then(res => res.json())
  .then(() => {
    eventForm.reset();
    fetchEvents();
  });
};

// Delete event
function deleteEvent(id) {
  if (!confirm('Delete this event?')) return;
  fetch(API_URL + '/' + id, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => fetchEvents());
}
