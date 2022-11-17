const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/userController')
const upload = require('../middleware/upload')


router.post('/signup', upload.single('profile_url'),AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/forgotPassword', AuthController.forgotpassword)
router.put('/edit/profile', AuthController.editprofile)
router.get('/user/details', AuthController.userdetails)
router.put('/update/username', AuthController.updateuser)
router.put('/update/profilePic', upload.single('profile_url'),AuthController.updateimage)
router.get('/verify/user', AuthController.verifyUser)


module.exports = router