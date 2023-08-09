const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const QueryLogin = async (data) =>{
    const user = await User.findOne({email:data.email})
    if(!user){
        const error = new Error('User not found')
        error.statusCode = 404
        throw error
    }
    const isPasswordMatched = await bcrypt.compare(data.password, user.password)
    if(!isPasswordMatched){
        const error = new Error('Password not matched')
        error.statusCode = 400
        throw error
    }
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
    return {
        user,
        token
    }
    
}
const QueryRegister = async (data) =>{
    const userExists = await User.findOne({email:data.email})
    if(userExists){
        const error = new Error('User already exists')
        error.statusCode = 400
        throw error 
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)
    const user = await User.create({
        name:data.name,
        email:data.email,
        password:hashedPassword
    })
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
    return{
        user,
        token
    }

}

module.exports = {
    QueryLogin,
    QueryRegister
}