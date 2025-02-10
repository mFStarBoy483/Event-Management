const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  registerAttendee,
  getEventAttendees,
} = require('../controllers/eventController');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { storage } = require('../config/cloudinary');

const upload = multer({ storage });

// Public route: Get all events
router.get('/', getEvents);

// Public route: Get attendees for a specific event
router.get('/:eventId/attendees', getEventAttendees);

// Protected route: Create a new event (requires authentication)
router.post('/', protect, upload.single('image'), createEvent);

// Public route: Register for an event
router.post('/:eventId/register', registerAttendee);

module.exports = router;
