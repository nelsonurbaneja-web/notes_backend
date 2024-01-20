const bcrypt = require('bcryptjs')
const { Router } = require('express')
const create_token = require('../middleware/create_token')
LoginRouter = Router()
const User = require('../models/User')

LoginRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body
    console.log({ email, password })
    const user = await User.find({email})

    if(user.length === 0) {
      return res.status(404).json({message: 'user or password invalid'})
    }

    const passwordValid = await bcrypt.compare(password, user[0].password)

    if(!passwordValid) {
      return res.status(406).json({message: 'user or password invalid'})  
    }

    const userForToken = {
      id: user[0]._id,
      email: user[0].email
    }
    
    const token = create_token({userForToken: userForToken, jwt_secret: process.env.DASHBOARD_JWT_SECRET_LOGIN})
    
    return res.status(200).json({user: user[0], token})

  } catch (error) {
    console.log('Error: ', error)
    return res.status(500).json({message: 'something went wrong'})
  }
})

module.exports = LoginRouter