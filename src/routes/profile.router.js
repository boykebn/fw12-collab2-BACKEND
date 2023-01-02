const profile = require('express').Router()

const {readProfile, updateProfile} = require('../controller/profile.controlller')
const authMiddleware = require('../middleware/auth.middleware')
const uploadMiddleware = require('../middleware/upload.middleware')

profile.get('/', authMiddleware, readProfile)
profile.patch('/', authMiddleware, uploadMiddleware, updateProfile)

module.exports = profile
