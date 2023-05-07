const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv/config')

const app = express()

app.use(bodyParser.json())

// Import routes

const postRoute = require('./routes/posts')

app.use('/posts', postRoute)

// Connect to DB

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
)
.then(() => console.log('connected'))
.catch((e) => console.error(`connection failed due to error ${e.message}`))

// Listening

app.listen(3000)