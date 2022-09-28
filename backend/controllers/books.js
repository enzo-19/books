const Book = require("../models/Book")
const mongoose = require('mongoose')

const getAllBooks = async (req, res) => {

    const createdBy = req.user._id

    const { title } = req.query

    const queryObj = { createdBy }

    if (title) {
        queryObj.title = { $regex: title, $options: 'i' }
    }

    const books = await Book.find(queryObj).sort({createdAt: -1})
    res.status(200).json(books)  
}
const getBook = async (req, res) => {

    const createdBy = req.user._id

    const {id} = req.params

    const book = await Book.findOne({ createdBy, _id: id })

    if (!book) {
        // este if lo tengo que hacer porque si no encuentra workout no larga error, sino que devuelve un book null
        return res.status(404).json({error: 'Book not found'})
    }

    res.status(200).json(book)
}
const createBook = async (req, res) => {
    const createdBy = req.user._id
    const {title, author, rating, read} = req.body
    const book = await Book.create({title, author, rating, read, createdBy})
    res.status(201).json(book)
}
const updateBook = async (req, res) => {
    const {id} = req.params

    const createdBy = req.user._id

    const book = await Book.findOneAndUpdate({createdBy, _id: id}, req.body, {new: true, runValidators: true})

    if (!book) {
        return res.status(404).json({error: 'Book not found'})
    }

    res.status(200).json(book)
}

const deleteBook = async (req, res) => {
    const {id} = req.params

    const createdBy = req.user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Book not found'})
    }

    const book = await Book.findOneAndDelete({createdBy, _id: id})

    if (!book) {
        return res.status(404).json({error: 'Book not found'})
    }

    res.status(200).json(book)
}

module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}