const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendees: [attendeeSchema],
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
