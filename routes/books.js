const express = require('express'),
    bcrypt = require('bcryptjs'),
    router = express.Router();

const Book = require('../models/books');

/* GET BOOKS listing. */
router.get('/', async function(req, res, next) {
    const bookInstance = new Book(null, null, null);
    const getBooks = await Book.getAllBooks();

    // console.log("allbooks returns the following: ", getBooks);
    res.render('template', { 
        locals: {
            title: 'Books page',
            is_logged_in: req.session.is_logged_in,
            allBooks: getBooks
            
    },
    partials:{
        partial: 'books-partial'
    }
    });
});

router.get('/:book_id',async function(req, res, next) {
    // const getBooks = await Book.getAllBooks();
    // console.log(req.params);

    const { book_id } = req.params;
    const bookInstance = new Book(book_id, null, null);
    const storeBook = await bookInstance.singleBook();
    const allReviews = await bookInstance.getAllReviews();
    console.log(allReviews);
    // console.log(storeBook);
    // console.log("allbooks returns the following: ", getBooks);
    res.render('template', { 
        locals: {
            title: 'Books reviews page',
            is_logged_in: req.session.is_logged_in,
            singleBook: storeBook,
            allReviews: allReviews

    },
    partials:{
        partial: 'book-review-partial'
    }
    });
}); 

router.post('/:book_id', async function(req,res,next) {
    console.log(req.body);    // from form
    console.log(req.params);  // from url

    const {content, score, id} = req.body;
    const bookInstance = new Book(id, null, null);

    await bookInstance.addReview(score, content, req.session.user_id)

    const storeBook = await bookInstance.singleBook();
    const allReviews = await bookInstance.getAllReviews();
    
    res.render('template', { 
        locals: {
            title: 'Books reviews page',
            is_logged_in: req.session.is_logged_in,
            singleBook: storeBook,
            allReviews: allReviews

    },
    partials:{
        partial: 'book-review-partial'
    }
    });
})

module.exports = router;