require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, {useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

//delete this
const subsribersRouter =  require('./routes/subscribers')
app.use('/subscribers', subsribersRouter)

const apiRouter =  require('./routes/api')
const userRouter =  require('./routes/user')
app.use('/api', apiRouter)
app.use('/user', userRouter)


app.listen(port, () => console.log('Server started'))