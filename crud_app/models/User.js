const mongoose = require('mongoose')
const {Schema} = mongoose

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
})
const User = mongoose.model('user',userSchema)
module.exports = User