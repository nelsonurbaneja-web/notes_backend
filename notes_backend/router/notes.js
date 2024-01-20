const { Router } = require('express')
const check_login_token = require('../middleware/check_login_token')
const Note = require('../models/Note')
const User = require('../models/User')

const router = Router()

router.get('/notas', (req, res) => {
  Note.find().populate('user', {username: 1, email: 1}).then(notes => {
    console.log('req userData', req.userData)
    res.status(200).json(notes)
  }).catch(err => console.log(err))
})

router.post('/notas', async (req, res) => {
  
  const { content, userId, important } = req.body

  const user = await User.findById(userId)

  const newNota = new Note({
    content,
    date: new Date(),
    important,
    user: user._id
  })

  try {
    const noteCreate = await newNota.save()
    res.status(200).json({noteCreate})
    user.notes = user.notes.concat(noteCreate._id)
    await user.save()
  } catch(err) {
    res.status(500).json({message: 'Error al crear la nota'})
  }


})

router.get('/notas/:id', async (req, res) => {
  Note.findById(req.params.id).populate('user').then(note => {
    if(note) {
      res.status(200).json({note})
    } else {
      res.status(404).json({message: 'Note not found'})
    }
  })
})

module.exports = router

