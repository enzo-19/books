const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: [50, 'Title max length is 50']
    },
    author: {
        type: String,
        maxlength: [30, 'Author max length is 30']
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    read: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
        required: true
    } 

}, { timestamps: true })

const Book = mongoose.model('Book', bookSchema)

module.exports = Book