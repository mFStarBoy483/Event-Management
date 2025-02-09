const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  status: { type: String, enum: ['registered', 'checked-in', 'cancelled'], default: 'registered' },
}, { timestamps: true });

module.exports = mongoose.model('Attendee', attendeeSchema);
