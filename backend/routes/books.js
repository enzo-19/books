const express = require('express')
const { getAllBooks, createBook, getBook, updateBook, deleteBook } = require('../controllers/books')
const router = express.Router()

router.use(require('../middleware/require-auth'))

router.route('/').get(getAllBooks).post(createBook)
router.route('/:id').get(getBook).put(updateBook).delete(deleteBook)

module.exports = router