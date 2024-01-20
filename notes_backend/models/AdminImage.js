const { Schema, model } = require("mongoose");

const AdminImageSchema = new Schema({
  url: String,
  publicId: String,
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'Admin'
  }
})

AdminImageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id,
    delete returnedObject._id,
    delete returnedObject.__v
  }
})

const AdminImage = model('Image', AdminImageSchema)
module.exports = AdminImage