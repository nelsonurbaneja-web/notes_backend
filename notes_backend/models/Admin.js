const { Schema, model } = require("mongoose");

const AdminSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  role: String,
  superAdmin: Boolean,
  avatar : {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  }
})

AdminSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id,
    delete returnedObject._id,
    delete returnedObject.__v
  }
})

const Admin = model('Admin', AdminSchema)
module.exports = Admin