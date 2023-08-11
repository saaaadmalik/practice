const UserService = require('../services/userService')
const User = require('../models/User')
const sendMail = require('../utils/email')
const crypto = require('crypto')

const loginPage = async (req, res) => {
    res.render('login')
}
const login = async (req, res, next) => {
    try {
        if (!req.body.email) {
            const error = new Error('Please enter email')
            error.statusCode = 400
            throw error
        }
        if (!req.body.password) {
            const error = new Error('Please enter password')
            error.statusCode = 400
            throw error
        }
        const { user, token } = await UserService.QueryLogin(req.body)
        res.cookie('token', token, { maxAge: 900000, httpOnly: true })
        const userWithoutPassword = user.toObject()
        delete userWithoutPassword.password
        res.json({
            success: true,
            message: 'Login successful',
            redirectUrl: '/students',

        });
    } catch (error) {
        console.log(error);
        res.status(500)
        next(error)

    }

}
const registerPage = async (req, res) => {
    res.render('register')
}
const register = async (req, res, next) => {
    try {
        if (!req.body.name) {
            const error = new Error('Please enter name')
            error.statusCode = 400
            throw error
        }
        if (!req.body.email) {
            const error = new Error('Please enter email')
            error.statusCode = 400
            throw error
        }
        if (!req.body.password) {
            const error = new Error('Please enter password')
            error.statusCode = 400
            throw error
        }
        const { user, token } = await UserService.QueryRegister(req.body)
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.status(500)
        next(error)

    }

}
const logout = async (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
}

const forgotPassword = async (req, res, next) => {
    try {
        if (!req.body.email) {
            const error = new Error('Please enter email')
            error.statusCode = 400
            throw error
        }
        const { user, resetToken } = await UserService.QueryForgotPassword(req.body)
        
        const resetPasswordUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`
        const message = `We have received a request to reset your password. Please click on the link below to reset your
         password:\n\n${resetPasswordUrl}\n\n The link will be expired in 10 minutes.\n 
         If you did not request this, please ignore this email and your password will remain unchanged.\n`

        try {
            await sendMail({
                email:user.email,
                subject:'Request for reset password',
                message:message
            })
            res.status(200).json({
                success:true,
                message:"Email has been sent to your email address successfully"
            })

        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save({validateBeforeSave:false})
            return next(new Error('Email could not be sent'))
        }

    } catch (error) {
        console.log(error.message);
        res.status(500)
        next(error)

    }
}

const resetPassword = async (req, res, next) => {
    try {
        const resetToken = crypto.Hash('sha256').update(req.params.token).digest('hex')
        const { password } = req.body
        if(!password){
            const error = new Error('Please enter password')
            error.statusCode = 400
            throw error
        }
        const user = await UserService.QueryResetPassword(resetToken,password)
        
        res.status(200).json({
            success:true,
            message:'Password reset successfully'
        })



    } catch (error) {
        console.log(error.message);
        res.status(500)
        next(error)

    }
}

module.exports = {
    loginPage,
    login,
    registerPage,
    register,
    logout,
    forgotPassword,
    resetPassword
}