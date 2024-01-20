require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

// Connecion a mongo db
require('./mongodb')

// Config de cloudinary
require('./cloudinary')

// import Routes
const NotesRouter = require('./router/notes')
const UserRouter = require('./router/users')
const LoginRouter = require('./router/login')
const AdminRouter = require('./router/admin')

// Middleweres
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// use routes
app.use('/api', NotesRouter)
app.use('/api/users', UserRouter)
app.use('/api/login', LoginRouter)
app.use('/api/admin', AdminRouter)

app.get('/', (req, res) => {
  res.status(200).send({message: 'Bienvenido al servidor'})
})

const PORT = 6060
const server = app.listen(PORT, () => {
  console.log('Conectado en: ', PORT)
})

module.exports = { app, server }