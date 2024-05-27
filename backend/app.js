const express = require('express')
const mongoose=require('mongoose')
const bodyparser= require('body-parser')
require('dotenv').config()


const app = express()
const port = 3000

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//conexion con la base de datos
mongoose.connect('mongodb://mongodb:27017/EducaFinanciera')
  .then(() => console.log('Base de datos conectada'))
  .catch(e=>{console.log(e)});

//import routes
const authRoutes= require('./routes/auth');
//route midlewares

app.use('/api/user',authRoutes)


app.get('/',(req,res)=>{
  res.send('Hola Alejandro')
})
//iniciar server
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})