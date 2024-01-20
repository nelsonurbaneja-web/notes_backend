const { Schema, model } = require('mongoose')

const UserShema = new Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

UserShema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

const User = model('User', UserShema)
module.exports = User