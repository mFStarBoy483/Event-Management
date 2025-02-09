Event Management System
📜 Overview
The Event Management System is a full-stack application designed to manage events and attendees. It provides features for event creation, attendee registration, and secure access to event data. The backend is built with Node.js, Express, and MongoDB, with Cloudinary for image storage. Authentication and authorization are handled with JWT (JSON Web Tokens).

🛠️ Tech Stack
Backend:
Node.js: JavaScript runtime for server-side development.
Express.js: Web framework for building RESTful APIs.
MongoDB: NoSQL database for storing events and attendees.
Mongoose: ODM (Object Data Modeling) library for MongoDB.
Cloudinary: Cloud service for image storage and management.
Multer: Middleware for handling multipart/form-data (image uploads).
JWT: Secure user authentication.
📂 Project Structure
bash
Copy
Edit
Event-Management
├── backend
│   ├── config              # Configuration files (Cloudinary, database connection)
│   │   ├── cloudinary.js   # Cloudinary configuration for image uploads
│   │   └── db.js           # Database connection setup
│   ├── controllers         # Logic for handling API requests
│   │   └── eventController.js  # Event-related operations (CRUD, attendee management)
│   ├── middleware          # Middleware for authentication and error handling
│   │   ├── authMiddleware.js   # Protects routes and verifies JWT tokens
│   │   └── errorMiddleware.js  # Centralized error handling
│   ├── models              # Mongoose schemas for database collections
│   │   ├── Event.js        # Event schema
│   │   ├── User.js         # User schema
│   │   └── Attendee.js     # Attendee schema
│   ├── routes              # API route definitions
│   │   ├── authRoutes.js   # Routes for user authentication
│   │   └── eventRoutes.js  # Routes for managing events and attendees
│   ├── utils               # Utility functions (e.g., token generation)
│   │   └── generateToken.js  # Generate JWT tokens
│   ├── .env                # Environment variables for sensitive information
│   ├── server.js           # Entry point for the backend server
│   └── seeder.js           # Script for seeding initial data into the database
└── frontend                # (If applicable, list your frontend structure here)
✨ Features
🔹 Public Features:
View Events: Retrieve a list of all available events.
Event Details: Get detailed information about a specific event and its attendees.
Register for Events: Register as an attendee for any event.
🔒 Protected Features (Authentication Required):
Create Event: Authenticated users can create new events with an image upload.
Secure Access: JWT-based authentication ensures that only authorized users can access certain features.
🔧 Setup Instructions
Prerequisites
Node.js and npm installed.
MongoDB installed or an online instance like MongoDB Atlas.
Cloudinary account for image storage.
Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-repo/event-management.git
cd event-management/backend
Install dependencies:

bash
Copy
Edit
npm install
Configure environment variables:
Create a .env file in the backend folder and add the following:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Seed initial data (optional):

bash
Copy
Edit
node seeder.js
Start the server:

bash
Copy
Edit
npm run dev
The backend server will run on http://localhost:5000.

🖥️ API Endpoints
Event Routes (/api/events)
GET /: Get all events.
POST /: Create a new event (protected, requires authentication).
GET /:eventId/attendees: Get attendees for a specific event.
POST /:eventId/register: Register an attendee for an event.
Authentication Routes (/api/auth)
POST /login: Authenticate a user and get a token.
POST /register: Register a new user.
📸 Image Uploads
Images are uploaded to Cloudinary when creating a new event. The image URL is stored in the event document in MongoDB.

🚀 Future Enhancements
Frontend Implementation: Build a responsive frontend using React.
Role-Based Access Control: Add admin roles for managing events and users.
Email Notifications: Notify attendees upon successful registration.
Event Search and Filters: Allow users to search and filter events.
🤝 Contribution
Feel free to fork this repository and submit pull requests. Suggestions and improvements are always welcome!

🛡️ License
This project is licensed under the MIT License.

📞 Contact
For any inquiries, contact me at praharigokul@gmail.com.

Photos 
Main Login Page
![image](https://github.com/user-attachments/assets/60309c9e-fd18-4f80-8c51-bb707d52ebf2)

Events Page
![image](https://github.com/user-attachments/assets/f34cc7b4-0722-4d87-8a83-2ccf832c96d1)

User can Create The Event
![image](https://github.com/user-attachments/assets/29c26b0c-84a9-41ad-8d02-8897a975c182)

Attendes Page and The Registered User (There Is a Seeder File So the user Have Not Rgistered ) 
![image](https://github.com/user-attachments/assets/c89a5130-0ce3-43c2-9f55-80e2db46a9a5)

Used The Jwt Token For the user
![image](https://github.com/user-attachments/assets/6d1b3158-de6e-4b86-8d39-c50607cd690e)

MongoDB 
![image](https://github.com/user-attachments/assets/e9e7388e-63d8-4f58-bb75-1bbda1aea384)

Cloudinary is used to store the images
![image](https://github.com/user-attachments/assets/6a1a7e31-bcb7-495b-b1ca-5e3ea2126f5d)

