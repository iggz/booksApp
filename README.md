ASSIGNMENT FOR JUNE 7TH

Create a Book Review App


Definitely Recommend using Express Generator

    Scaffolds out the basic folder structure for routes/views
    Gets up and running quickly
    Be sure to add: pg-promise
    Be sure to add: ES6 Render Templates
    Be sure to add: bycrypt
    Be sure to add: express-session

Database (PSQL)

    Users
    Books
    Reviews


**** CREATE A SCHEMA.SQL FILE! ****

    What tables do I need?
    What goes in those tables?
    What are the relationships??


**** CREATE A SEED.SQL FILE! ****

    Sample data...


Node + Express

    pg-promise - This talks to squirrels (j/k, it talks to Postgres)

    ES6 Render Template - Creates our views

    bcrypt + express-session - User password hashing/session management


Users -> bcrypt -> login to the App, that's running in Node and Express -> have data -> saved in PSQL

Books -> have data -> saved in PSQL

Reviews -> have data, that is linked to BOOKS and USERS -> saved in PSQL

BOOKS -> ROUTE -> Plural -> Singular

    localhost:3000/books
    localhost:3000/books/:book_id


BOOK (singular) ROUTE -> REVIEWS
USERS (WHO ARE LOGGED IN) -> SUBMIT A REVIEW
*** Possible Stretch Goals ***

Just gonna leave this here (api for book data from ISBN lookup)... https://isbndb.com/apidocs/v2

Just gonna leave this here as well (Goodreads api data)... https://www.goodreads.com/api/documentation