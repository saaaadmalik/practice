const UserService = require('../services/userService')

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

module.exports = {
    loginPage,
    login,
    registerPage,
    register,
    logout
}