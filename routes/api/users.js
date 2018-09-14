var express = require('express');
var router = express.Router();
const mysql = require('promise-mysql');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/config');
const passport = require('passport');

// load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   POST api/users/register
// @desc    Register users
// @access  Public
router.post('/register', (req, res) => {
  let requestBody = {};
  requestBody.first_name = req.body[0][0];
  requestBody.last_name = req.body[0][1];
  requestBody.user_name = req.body[0][2];
  requestBody.password = req.body[0][3];
  requestBody.email = req.body[0][4];
  requestBody.password2 = req.body[0][5];

  const { errors, isValid } = validateRegisterInput(requestBody);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let User = [];
  const Avatar = gravatar.url(req.body[0][4], {
    s: '200', // Size
    r: 'pg', // Rating
    d: 'mm' // Default
  });
  const INSERT_NEW_USER = 'INSERT INTO user (first_name, last_name, user_name, password, email, avatar) VALUES ?';

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body[0][3], salt, (err, hash) => {
      if(err) throw err;
      User.push([
        req.body[0][0],
        req.body[0][1],
        req.body[0][2],
        hash,
        req.body[0][4],
        Avatar
      ]);
    })
  })

  let connection = null;
  mysql
    .createConnection(keys.mysql)
    .then(
      (conn) => {
        connection = conn;
        const result = connection.query(INSERT_NEW_USER, [User]);
        connection.end();
        return result;
      }
    )
    .then(sent => {
      if(sent) {
        return res.status(200).json({new_user: 'new user was added'});
      }
    })
    .catch((err) => {
      errors.user_name = "user name is taken";
      return res.status(401).json(errors);
    })
});


// @route   POST api/users/login
// @desc    login user
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let err = {};
  if (!req.body[0][0]) {
    err.empty = 'cannot send empty fields';
    return res.status(401).json(err.empty).res.send(err.empty);
  } else {
    let userName = req.body[0][0];
    let password = req.body[0][1];
    const CHECK_USER = `select count(*) AS count, password, id, avatar, first_name, last_name, user_name from user where user_name = "${userName}"`;
    let connection = null;
    mysql
      .createConnection(keys.mysql)
      .then(
        (conn) => {
          connection = conn;
          const result = connection.query(CHECK_USER);
          connection.end();
          return result;
        }
      )
      .then(count => {
        let confermation = JSON.parse(JSON.stringify(count));
        let user = confermation[0];

        if(!user.count) {
          return res.status(404).json({user_name: 'Could not find user name'});
        }

        // check password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch) {
              // user matched

              const payload = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                user_name: user.user_name,
                avatar: user.avatar
              } // creat jwt payload

              // sign token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });

                  console.log('Bearer ' + token)
                });
            } else {
              return res.status(400).json({password: 'Password incorrect'});
            }
          })
      })
      .catch((error) => {
        console.error(error);
      });
  }
});


// @route   POST api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user)
});


module.exports = router;
