const express = require('express'),
    router = express.Router();

const BooksController = require('../controllers/books');

/* GET BOOKS listing. */
router.get('/', BooksController.books_index_get);

router.get('/:book_id', BooksController.book_by_id_get);

router.post('/:book_id', BooksController.book_by_id_post);

module.exports = router;