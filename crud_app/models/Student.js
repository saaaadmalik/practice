const mongoose = require('mongoose')
const {Schema}  = mongoose

const studentSchema = new Schema({
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
    class:{
        type:String,
        required:[true,'Please enter class']
    },
    semester:{
        type:Number,
        required:[true,'Please enter semester']
    }

})

const Student = mongoose.model('student', studentSchema)
module.exports = Student