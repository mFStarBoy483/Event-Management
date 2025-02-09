const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Event.deleteMany();

    // Seed users
    const users = await User.insertMany([
      {
        name: 'testuser',
        email: 'testuser@gmail.com',
        password: '1234567890',
      },
      {
        name: 'Balaji Gokul Krishna Sai',
        email: 'gokul@gmail.com',
        password: '1234567890',
      },
      {
        name: 'Another User',
        email: 'anotheruser@gmail.com',
        password: '1234567890',
      },
    ]);

    // Seed events with embedded attendees
    const events = await Event.insertMany([
      {
        title: 'Tech Conference 2025',
        description: 'A conference about the latest in tech.',
        date: new Date('2025-03-15T14:00:00.000Z'),
        image: 'https://res.cloudinary.com/do9lunhhd/image/upload/v1738932107/Event%20Management/h4zftwl4sou4q1zwashc.jpg',
        createdBy: users[0]._id,
        attendees: [
          { name: 'testuser', email: 'testuser@gmail.com' },
          { name: 'Another User', email: 'anotheruser@gmail.com' }
        ],
      },
      {
        title: 'Music Fest 2025',
        description: 'A festival with amazing music performances.',
        date: new Date('2025-05-10T18:00:00.000Z'),
        image: 'https://res.cloudinary.com/do9lunhhd/image/upload/v1738932137/Event%20Management/z3h1svrug5wdeshrducu.jpg',
        createdBy: users[1]._id,
        attendees: [
          { name: 'Balaji Gokul Krishna Sai', email: 'gokul@gmail.com' }
        ],
      },
    ]);

    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
