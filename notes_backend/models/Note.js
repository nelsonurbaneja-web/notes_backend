const { Schema, model } = require('mongoose')

const NoteShema = new Schema({
  content: String,
  date: String,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})


NoteShema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', NoteShema)

module.exports = Note