const { Router } = require('express')
const adminRouter = Router()
const cloudinary = require('cloudinary').v2

// models
const Admin = require('../models/Admin')
const AdminImage = require('../models/AdminImage')
const mongoose = require('mongoose')

const { CONFIG_IMAGE_CLOUDINARY } = require('../config')

adminRouter.post('/', async (req, res) => {

  const session = await mongoose.startSession() // inicio la sesion
  session.startTransaction() // inicio la Transaction con la session
  const t = { session, new: true }
  
  try {
    const {name, age, role, superAdmin}  = req.body

    const admin = new Admin({
        name,
        age,
        role,
        superAdmin,
        avatar: null
    })

    const newAdmin = await admin.save(t)

    if(newAdmin) {
      const resultImageCloudinary = await cloudinary.uploader.upload(req.body.avatar, CONFIG_IMAGE_CLOUDINARY)

      console.log(resultImageCloudinary)
      res.status(200).json({newAdmin})

      const adminImage = new AdminImage({
        url: resultImageCloudinary.secure_url,
        publicId: resultImageCloudinary.public_id,
        adminId: newAdmin._id
      })

      const newImage = await adminImage.save(t)

      newAdmin.avatar = await newImage._id
      await newAdmin.save(t) 
      
      // Si llego aqui entonces todo ok

      await session.commitTransaction();  // Hago commit de la transaccion
      session.endSession(); // cierro la session
      console.log('TODO OKKKKKK...')

    } else {
      await session.abortTransaction();  // Si falla aborto la transaccion
      session.endSession(); // cierro la session
      res.status(500).json({message: 'No se se pudo crear el admin'})
    }

  } catch(error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({message: 'Nose édo crear', error})
  }
})

adminRouter.get('/', async (req, res) => {
  const admins = await Admin.find().populate('avatar')
  res.status(200).json({admins})
})

module.exports = adminRouter