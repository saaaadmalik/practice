const mongoose = require('mongoose');
const UserModel = require('./User');
// const User = require('./User');

// try {
//     mongoose.connect('mongodb://localhost/mongoosedb',
// ()=>{
//     console.log('Database connected');
// }, (err)=>{
//     console.error(err);
// })
// } catch (error) {
//     console.log(error);
// }

mongoose.connect('mongodb://localhost/mongoosedb')
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err));



// createUser()
async function createUser(){
    try {
        const user = await User.create({
            name: 'Zack',
            age: 211,
            email:"ZACK@GMAIL.COM",
            hobbies: ['Reading', 'Coding'],
            address:{
                street: '1234 Main St',
                City: 'Pindi'
            }
        })
        user.createdAt = 544
        user.hobbies.push('Gaming')
        await user.save();
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
}


// findbyidandupdate, findoneandupdate, skip all the validation that we have in our schema
//so use findbyid() and then save() method etc. 
//because all the validation is done in save() and create() method.

// updateUser()
async function updateUser(){
    try {
        // const user = await User.findById("64d2671fbb14ab0d5ebc7598")
        const user = await UserModel.where('age')
        .equals(24)
        .limit(1)
        .where('name')
        .equals('Zack')
        .select('name age')
        .populate('bestFriend')

        console.log(user);
        user[0].sayHi()
        user[0].bestFriend ='64d257b00db943750d258eb2'
        await user[0].save()

        
        // const populatedUser = await UserModel.populate(user[0],{
            //     path:'bestFriend',
            //     select:'name age'
            // } )
        
    } catch (error) {
        console.log(error.message);
    }
}

// findbyname()
async function findbyname(){
try {
    const users = await UserModel.findByName('mosh')
    console.log(users);
} catch (error) {
    console.log(error.message);
}
}


// byname()
async function byname (){
try {
    const users = await UserModel.find().byName('mosh')
    console.log(users);
    
} catch (error) {
    console.log(error.message);
}
}

// nameEmail()   
async function nameEmail(){
    try {
        const user = await UserModel.findOne({name : 'Zack', email: 'zack@gmail.com' })
        console.log(user.namedEmail)
        
    } catch (error) {
        console.log(error.message);
        
    }

}

// presave()
async function presave (){
    try {
        const user = await UserModel.findOne({name:"Zack", email:'zack@gmail.com', age:24})
        console.log(user);
        await user.save()
        // console.log(user)
        
    } catch (error) {
        console.log(error.message);
    }
}
// postsave()
async function postsave (){
    try {
        const user = await UserModel.findOne({name:"Zack", email:'zack@gmail.com', age:24})
        await user.save()
        console.log(user) //it shows the say hi content right after the user is saved
    } catch (error) {
        console.log(error.message);
    }
}
//some mongoose queries

// User.find({name: 'Zack'})    //find all the users with name zack
// User.findOne({name: 'Zack'})  //find the first user with name zack
// User.findById('64d2671fbb14ab0d5ebc7598')    //find the user with this id
// User.find({age: {$gt: 20}})   //find all the users with age greater than 20
// User.deleteOne({name: 'Zack'})    //delete the first user with name zack
// User.deleteMany({name: 'Zack'})   //delete all the users with name zack
// User.where('name').equals('Zack')    //find all the users with name zack
// User.where('age').gt(20)     //find all the users with age greater than 20
// User.where('name').equals('Zack').where('age').gt(20).lt(30)     //find all the users with name zack and age greater than 20 and less than 30
// User.where('name').equals('Zack').limit(3).select('name age')     //find all the users with name zack and return only name and age and limit the results to 3



// async function createUser() {
//     //1 method to create a user

//     // const user = new User({
//     //     name: 'Mosh',
//     //     age: 25,
//     // });
//     // await user.save();

//     //2 method to create a user
    
//     const user = await User.create({
//         name:"Zack",
//         age: 23,
//     })
//     console.log(user);

// }