const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connect = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes')
const studentRoutes = require('./routes/studentRoutes')
const error = require('./middleware/errorHandler')


const app = express();
dotenv.config({path: './config/.env'})
connect()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.set('view engine','ejs')

app.use('/', userRoutes)
app.use('/students', studentRoutes)

app.use(error)

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})