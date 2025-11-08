const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Event = require('./Event');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace 'college-events-db' with your exact database name
mongoose.connect('mongodb://localhost:27017/college-events-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to database:', err));

// Create a new event
app.post('/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete event by id
app.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).send({ message: 'Event not found.' });
    res.send({ message: 'Event deleted.' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start your server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

