const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const productsRouter = require('./routes/productsRoute')
const userRouter = require('./routes/userRoute')
const authenticationRoute = require("./Routes/AuthenticationRoutes");
const autherizationMW = require("./Core/Authorization/authorization") ;
const buyingBagrouter = require('./routes/buyingBagRoute')

require('dotenv').config()


const server = express()
let port = process.env.port || 8080

mongoose.set('strictQuery' , true)

/// conect to database 

mongoose.connect(process.env.DB_url)
        .then( () => {
            console.log("data base connected")
            server.listen( port , ()=> {
                console.log("server connected")
            })
        })

//// first layer 

server.use( (request , response , next) => {
    next();
})

server.use(express.json()) 
server.use(cors())




//// middelware layers of routing and authentication 


server.use(authenticationRoute);
server.use(autherizationMW);
server.use(productsRouter)
server.use(userRouter)
server.use(buyingBagrouter)


/// third layer no page found 

server.use( (request , response , next) => {
    response.status(404).json({message : "page not found "})
})

/// fourth layer for handling errors 

server.use ( (error , request , response , next) => {
    response.status(500).json({message : error + " "});

})

