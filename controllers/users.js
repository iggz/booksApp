const bcrypt = require('bcryptjs');

const Users = require('../models/users');

exports.signup_get = (req, res) => {
    res.render('template', {
        locals: {
            title: 'Sign Up Page',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'signup-form-partial'
        }
    });
}
