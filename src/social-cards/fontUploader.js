const cloudinary = require('cloudinary').v2;
// this is shown at the top right of https://cloudinary.com/console
const CLOUDINARY_CLOUD_NAME = 'djeivq7td';
// find these at https://cloudinary.com/console/settings/security
const CLOUDINARY_API_KEY = '335985757846474';
const CLOUDINARY_API_SECRET = 'cUZP88uxeXcii3xn6XT9yguVjzU';
// path to the custom font (TTF or OTF only), relative to this file
const PATH_TO_FILE = 'my-font.ttf';
// used in Cloudinary URLs — no underscores allowed!
const PUBLIC_ID = 'my-font.ttf';
const uploadToCloudinary = async () => {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  const result = await cloudinary.uploader.upload(PATH_TO_FILE, {
    resource_type: 'raw',
    type: 'authenticated',
    public_id: PUBLIC_ID,
  });
  console.log(result);
};
uploadToCloudinary();
