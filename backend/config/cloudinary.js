const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with your credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Event Management', // More consistent and URL-friendly folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // Simplified order of formats
    use_filename: true,  // Use the original filename for the uploaded image
    unique_filename: false,  // Prevent Cloudinary from appending random characters
    resource_type: 'image',  // Ensure that only image files are allowed
  },
});

module.exports = { cloudinary, storage };
