const express = require('express');
const router = express.Router();
const UserController=require('../controllers/userController')

router.route('/').get(UserController.loginPage)
router.route('/login').post(UserController.login)
router.route('/register').get(UserController.registerPage)
router.route('/register').post(UserController.register)
router.route('/logout').get(UserController.logout)

router.route('/forgotPassword').post(UserController.forgotPassword)
router.route('/resetPassword/:token').patch(UserController.resetPassword)

module.exports = router;