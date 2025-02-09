const Event = require('../models/Event');
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch events',
      error: error.message,
    });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    if (!title || !description || !date) {
      return res.status(400).json({ message: 'Title, description, and date are required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'event-images' });

    const event = new Event({
      title,
      description,
      date,
      image: result.secure_url,
      createdBy: req.user._id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create event',
      error: error.message,
    });
  }
};

// Register an attendee for an event
exports.registerAttendee = async (req, res) => {
  const { attendeeName, attendeeEmail } = req.body;

  try {
    if (!attendeeName || !attendeeEmail) {
      return res.status(400).json({ message: 'Attendee name and email are required' });
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const alreadyRegistered = event.attendees.some(
      attendee => attendee.email.toLowerCase() === attendeeEmail.toLowerCase()
    );

    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Attendee already registered' });
    }

    event.attendees.push({ name: attendeeName, email: attendeeEmail });
    await event.save();

    res.status(200).json({
      message: 'Registration successful',
      attendee: { name: attendeeName, email: attendeeEmail },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to register attendee',
      error: error.message,
    });
  }
};

// Get attendees for a specific event along with the event name
exports.getEventAttendees = async (req, res) => {
  const { eventId } = req.params;

  // Check if eventId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({ message: 'Invalid event ID format' });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      eventName: event.title,
      attendees: event.attendees || [],
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch attendees',
      error: error.message,
    });
  }
};
