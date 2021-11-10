const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')  
const classRoutes = require('./routes/class')  
const paymentRoutes = require('./routes/payment')  
const requestRoutes = require('./routes/request')  

//database connection
mongoose.connect(process.env.MONGODB_CONNECT,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('MongoDB Connnected')
}).catch((err)=>{
  console.log(err,'Error Occured Connecting To DB');
})


//middlewares
app.use(bodyParser.json());
app.use(cors());


//routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/class', classRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/request', requestRoutes)

let port = process.env.PORT || 3004;
  app.listen(port, err => {
    if (err) {
      console.log('Cannot run!');
    } else {
      console.log(`Running on the port ${port}` );
    }
  });


