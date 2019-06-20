const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
const mongoose = require('mongoose');

const CarRoute = require('./routes/CarRoute');
const configDB = require('./config/database');



mongoose.connect(configDB.database, {useNewUrlParser: true})
.then(()=>{
  console.log('connecting to dataBase')
})
.catch(()=>{
  console.log('Connection failed');
})

app.use(bodyParser.json());
app.use(cors());



app.use('/api/car',CarRoute);



module.exports = app