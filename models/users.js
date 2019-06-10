const db = require('./conn');

class User {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    async CheckIfDuplicate() {
        try{
            const response = await db.one(`
                SELECT email 
                FROM users 
                WHERE email = $1
            `, [this.email]);
            return response;
        } catch(err){
            return err.message;
        }
    }

    async save() {
        try {
            const response = await db.one(`
                insert into users 
                    (first_name, last_name, email, password)
                values
                    ($1, $2, $3, $4)
                returning id
                `, [this.first_name, this.last_name, this.email, this.password]);
            console.log('user was created with id:', response.id);
            return response;
        }catch(err){
            return err.message;
        }
    }

    async getUserByEmail() {
        try{
            const userData = await db.one(`
                SELECT id, first_name, last_name, password
                FROM users
                WHERE email = $1
                `, [this.email]);
                console.log('hash is: ', userData.password);
                return userData;

        } catch(err) {
            return err.message;
        }
    }

}

module.exports = User;