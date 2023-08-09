const mongoose = require('mongoose');

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL , {
            useNewUrlParser :true,
            useUnifiedTopology:true,
        })
        console.log('Successfully connected to MongoDB');
        
    } catch (error) {
        console.log('Error connecting to MongoDB');
        console.log(error);
        
    }
}
module.exports = connect;