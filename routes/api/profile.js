var express = require('express');
const router = express.Router();
const mysql = require('promise-mysql');
const keys = require('../../config/config');
const passport = require('passport');

// @route   GET api/profile
// @desc    get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  let err = {};
  if (!req.body[0][0]) {
    err.empty = 'cannot send empty fields';
    return res.status(401).json(err.empty).res.send(err.empty);
  } else {
    const errors = {};
    const QUERY_PROFILE = `SELECT * FROM profile WHERE user_id = ${req.user.id}`;
    let connection = null;
    mysql
      .createConnection(keys.mysql)
      .then(
        (conn) => {
          connection = conn;
          const result = connection.query(QUERY_PROFILE);
          connection.end();
          return result;
        }
      )
      .then(profileBlob => {
        let profileParsed = JSON.parse(JSON.stringify(profileBlob));
        let profile = profileParsed[0];
        if (!profile) {
          errors.noprofile = 'there is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
});


// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  if(!req.body.handle) req.body.handle = 'Mike';
  if(!req.body.company) req.body.company = 'enlink';
  if(!req.body.website) req.body.website = 'www.michealgiles.com';
  if(!req.body.location) req.body.location = 'haslet';
  if(!req.body.status) req.body.status = '1';
  if(!req.body.bio) req.body.bio = 'dont have one';
  if(!req.body.githubusername) req.body.githubusername = 'mikegg89';

  const profile = [];
  profile.push([
    req.user.id,
    req.body.handle,
    req.body.company,
    req.body.website,
    req.body.location,
    req.body.status,
    req.body.bio,
    req.body.githubusername
  ]);


  if (req.body === null) {
    let err;
    res.status(err.status || 500);
    res.render('error');
  } else {
    const INSERT_PROFILE = 'INSERT INTO profile (user_id, handle, company, website, location, status, bio, githubusername) VALUES ?';

    let connection = null;
    mysql
      .createConnection(keys.mysql)
      .then(
        (conn) => {
          connection = conn;
          const result = connection.query(INSERT_PROFILE, [profile]);
          connection.end();
          return result;
        },
        err => connection.end().then(() => {
          throw err;
        }),
      )
      .catch((error) => {
        console.error(error);
      });

    res.send(req.body);
  }
});

module.exports = router;
