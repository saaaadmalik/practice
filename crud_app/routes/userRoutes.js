const express = require('express');
const router = express.Router();
const UserController=require('../controllers/userController')

router.route('/').get(UserController.loginPage)
router.route('/login').post(UserController.login)
router.route('/register').get(UserController.registerPage)
router.route('/register').post(UserController.register)
router.route('/logout').get(UserController.logout)

module.exports = router;