const profile = require('express').Router()
const {readProfile, uploadProfilePicture, updateUser} = require('../controller/profile.controlller')
const uploadMiddleware = require('../middleware/upload.middleware')

profile.get('/', readProfile)
// profile.post('/', uploadMiddleware, uploadProfilePicture)

profile.patch('/', uploadMiddleware, updateUser)

module.exports = profile
