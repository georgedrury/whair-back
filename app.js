const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const fs = require('fs');
// const jsonwebstoken = require('jsonwebstoken')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

//database
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true }
  )
.then(() => {
    console.log('DB Connected')
})

mongoose.connection.on("error", err => {
    console.log(`DB connection error ${err.message}`)
})

//bring in routes
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth') 
const userRoutes = require('./routes/user')
  
// middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())
app.use('/', postRoutes)
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({
          error: "Unauthorised!"
      })
    }
  });




const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`listening on Port:${port} and using Nodemon to watch this shit `)
})