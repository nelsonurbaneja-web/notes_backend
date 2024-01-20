const CONFIG_IMAGE_CLOUDINARY = {
  resource_type: "image",
  // folder: `${process.env.APP_NAME}/${process.env.NODE_ENV}/uploads/instructor`,
  timeout: 300000,
  allowed_formats: ['jpg', 'png', 'jpeg'],
  width: 'auto', 
  height: 500,
  format: 'png',
  eager: [
    {format: 'webp'}
  ]
}

module.exports = { CONFIG_IMAGE_CLOUDINARY }