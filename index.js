require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

 const pfSevrer = express()

 pfSevrer.use(cors())
 pfSevrer.use(express.json())
 pfSevrer.use(router)

 const PORT = 3000 || process.env.PORT  //IF 3000 NOT AVAILABLE TAKE IF ENV FILE HAS PORT 

 pfSevrer.listen(PORT,()=>{
    console.log(`Project Fair server started at port : ${PORT} and waiting for client request !! `);
    
 })

 //http://localhost:3000/  - get 
 pfSevrer.post('/',(req,res)=>{
    res.status(200).send('<h1 style= "color:red">Project Fair server started at port  and waiting for client request !!</h1>')
 }) //function with 2 argument --Controller  

