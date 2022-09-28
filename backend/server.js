require('dotenv').config()
require('express-async-errors')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const errorHandler = require('./middleware/error-handler')
const booksRoutes = require('./routes/books')
const userRoutes = require('./routes/user')
const port = process.env.PORT || 5050

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

// routes
app.use('/api/v1/books', booksRoutes)
app.use('/api/v1/user', userRoutes)

// error handler
app.use(errorHandler)

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    })
    .catch(err => console.log(err))

