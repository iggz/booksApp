const db = require('./conn');

class Book {
    constructor(id, author, title) {
        this.id = id;
        this.author = author;
        this.title = title;
    }

    static async getAllBooks() {
        try {
            const response = await db.any(`
            select * from books
            `)
            return response;
        } catch(err) {
            return err.message;
        }
    }


    async singleBook() {
        try {
            const response = await db.one(`
            select * from books where id = $1
            `, [this.id]);
            return response;
        } catch(err){
            return err.message;
        }
    }

    async getAllReviews() {
        try {
            const response = await db.any(`
                select book.id, book.title, rev.content, rev.score, u.first_name
                from books as book, reviews as rev, users as u
                where rev.book_id = $1 AND book.id = $1 and rev.user_id = u.id;
            `,[this.id])
            return response;
        }catch(err) {
            return err.message;
        }
    }

    async addReview(score, content, user_id) {
        try {
            const response = await db.any(`
                INSERT INTO reviews(score, content, book_id, user_id)
                VALUES ($1, $2, $3, $4)

            `,[score, content, parseInt(this.id), user_id])
            console.log("addReview has run", user_id);
            return response;
        }catch(err) {
            return err.message;
        }
    }
}

module.exports = Book;