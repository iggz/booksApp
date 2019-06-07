const express = require('express'),
  bcrypt = require('bcryptjs'),
  router = express.Router();

const User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('template', { 
    locals: {
      title: 'User page',
      is_logged_in: req.session.is_logged_in
  },
  partials:{
      partial: 'users-partial'
  }
  });
});

router.get('/signup', (req,res) => {
  res.render('template', {
    locals: {
      title: 'Sign Up Page',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'signup-form-partial'
    }
  });
});

router.post('/signup', async (req,res) => {
  const { first_name, last_name, email, password } = req.body;
  console.log('req.body is displayed as: ', req.body);
  console.log('email as entered', email);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const userInstance = new User (null, first_name, last_name, email, hash);
  let check = await userInstance.CheckIfDuplicate();

  if(typeof check === 'object') {
    console.log('This email is already registered. Please register a new email ya freakin jabronie!!!!');
    res.redirect('/users/login');
  } else {
  await userInstance.save().then(response => {
    console.log("signup response is", response);
    res.redirect('/users/login');
    });
  };
});

router.get('/login', (req,res) => {
  res.render('template', {
    locals: {
      title: 'Login Page',
      is_logged_in: req.session.is_logged_in

    },
    partials: {
      partial: 'login-form-partial'
    }
  });
});

router.post('/login', (req,res) => {
  const {email, password } = req.body;
  console.log(req.body);

  const userInstance = new User(null, null, null, email, password);
  userInstance.login().then(response => {
    req.session.is_logged_in = response.isValid;
    console.log("post login response is", response);

    if(!!response.isValid) {
      req.session.first_name = response.first_name;
      req.session.last_name = response.last_name;
      req.session.user_id = response.user_id;
      res.redirect('/');
    } else {
      res.sendStatus(401);
    }
  })
})

router.get('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;