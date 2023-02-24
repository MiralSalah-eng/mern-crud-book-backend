const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    author : {
        type :String,
        required: [true, 'Please Enter Author name']
    },
    title : {
        type :String,
        required: [true, 'Please Enter Book Title']
    },
    description : {
        type :String,
        required: [true, 'Please Enter Description']
    },
    pages : {
        type :Number,
        required: [true, 'Please Enter Number Of Pages']
    },
    user_id : { 
        type :String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Book',bookSchema)
