const express = require('express');
const app = express();
const studentRoute = require('./api/routes/student');
const facultyRoute = require('./api/routes/faculty');
const userRoute = require('./api/routes/user');
const productRoute = require('./api/routes/product');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Connecting database
mongoose.connect('mongodb+srv://shahmir:disclose@cluster0.zbkg4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.on('error',err=> {
    console.log('connection failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('Connected with database');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/student',studentRoute);
app.use('/faculty',facultyRoute);
app.use('/user',userRoute);
app.use('/product',productRoute);


// app.use((req,res,next) => {
//     res.status(200).json({
//         message : "app is running in local host"
//     })
// })

app.use((req,res,next)=>{
    res.status(404).json({
        error : "url not found"
    })
})

module.exports = app;