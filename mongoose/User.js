const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    City: String
})
//all these validation are gone in save and create  method.
const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        //custom validation
        validate :{
            validator : value => value % 2 === 0,
            message: props => `${props.value} is not an even number`
        }
    },
    email: {
        minLength: 10,
        type: String,
        required:true,
        lowercase:true,
    },
    createdAt: {
        immutable: true,
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    bestFriend:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    hobbies: [String],
    // address:{
    //     street: String,
    //     City: String
    // }
    address:addressSchema
})

//*****schema methods*****
//these methods are called on  instances of the model
userSchema.methods.sayHi = function ( ) {
    console.log(`Hi  my name is ${this.name} and I am ${this.age} years old`)
    
}

//*****schema statics*****
//statistis can be called on the model itself
userSchema.statics.findByName = function (name){
    return this.find({name : new RegExp(name, 'i')})
}

//*****query*****
//these methods are called on query and query is returned when we call somethinng like find() or where() etc.  
userSchema.query.byName = function (name) {
    return this.where({name: new RegExp(name, 'i')})
}

//*****virtuals*****
//these are the properties that we can get and set but they are not stored in the database
//these properties are derived from other properties
//this is a virtual property of a document
userSchema.virtual('namedEmail').get(function () {
    return `${this.name}--- <${this.email}>`
})

//*****Schema middleware*****
//pre() and post() are called hooks
//pre() is called before the event and post() is called after the event
//the event can be save(), create(), remove() etc.
userSchema.pre('save',function(next){
    this.updatedAt = Date.now()
    next()
    //if save fails then use throw new Error('Fail save')
})
userSchema.post('save',function(doc,next){
    //here doc here is the thing that has been saved
    doc.sayHi()
    next()
})

// module.exports = mongoose.model('User', userSchema);
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;