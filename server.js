const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
var cors = require('cors')

const bookRouter = require('./routes/bookRouter')
const userRouter = require('./routes/userRoutes')

app.use(
    cors({
        origin : [ "http://localhost:3000", "https://mern-crud-book.onrender.com" ]
    })
    )
app.use(express.json())
app.use('/api/books',bookRouter)
app.use('/api/users',userRouter)

const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log("Server working on port 4000 and connectd to mongodb" )
    })
}).catch(error => {
    console.log(error);
})

