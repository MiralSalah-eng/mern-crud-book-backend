const express = require('express')
const router = express.Router()
const {getBooks,getSingleBook,createBook,deleteSingleBook,updateSingleBook} = require('../controller/bookController')

const requireAuth = require('../middlewares/requireAuth')


router.use(requireAuth)

router.get('/', getBooks)

router.get('/:id', getSingleBook)

router.post('/', createBook)

router.delete('/:id', deleteSingleBook)

router.patch('/:id',updateSingleBook)

module.exports = router
