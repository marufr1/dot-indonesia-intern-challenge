const express = require('express')
const router = express.Router()
const { verify } = require('../middlewares/authentication')
const controller = require('../controllers/user.controller')
const user = require('../middlewares/user.validation')

router.post('/signup', user.validation, controller.userSignUp)
router.post('/login', user.validationForLogin, controller.userLogin)
router.get('/account', verify, controller.getUserProfile)
router.put('/account', verify, user.validationForUpdate, controller.updateUser)
router.delete('/account', verify, controller.deleteUser)


module.exports = router