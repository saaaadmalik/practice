const mongoose = require('mongoose')
const {Schema} = mongoose
const crypto = require('crypto')

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'Please enter name']
    },
    email:{
        type:String,
        required:[true,'Please enter email'],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'Please enter password']
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

userSchema.methods.generateResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 10*60*1000

    // console.log(resetToken, this.resetPasswordToken)

    return resetToken
}

const User = mongoose.model('user',userSchema)
module.exports = User