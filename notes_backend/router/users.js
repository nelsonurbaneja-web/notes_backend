const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

UserRouter = Router()


UserRouter.get('/', (req, res) => {
  User.find({}).then(users => {
    if(users.length > 0) {
      res.status(200).json({message: 'process done', users})
    } else {
      res.status(404).json({message: 'I did not find users'})
    }
  }).catch(error => {
    res.status(500).json({message: 'error server users', error})
  })
})

UserRouter.get('/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  User.findById(id).populate('notes', {content: 1, date: 1, important: 1})
  .then(user => {
    if(user) {
      return res.status(200).json({message: 'process done', user})
    } else {
      return res.status(404).json({message: 'user not found'})
    }
  }).catch(error => {
    return res.status(500).json({message: 'error server user', error})
  })
})


UserRouter.post('/', async (req, res) => {
  const { body }  =  req
  const { username, email, password } = body
  
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = new User({
    username,
    email,
    password: passwordHash
  })
  
  await User.find({email: email})
  .then(user => {
    if(user.length > 0) {
      console.log('user', user)
      res.status(406).json({message: 'Usuario ya existe'})
    } else {
      newUser.save(newUser).then(user => {
        res.status(200).json({message: 'User created', user})
      }).catch(err => {
        res.status(500).json({message: 'Error 500 al crear usuario', err})
      })
    }
  })
})

module.exports = UserRouter