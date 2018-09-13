var express = require('express');
const router = express.Router();
const mysql = require('promise-mysql');
const keys = require('../../config/config');


router.get('/user', (req, res) => {
  if (req.body === null) {
    let err;
    res.status(err.status || 500);
    res.render('error');
  } else {
    const QUERY_USERS = 'SELECT * FROM user';
    let connection = null;
    mysql
      .createConnection(keys.mysql)
      .then(
        (conn) => {
          connection = conn;
          const result = connection.query(QUERY_USERS, (err, results, fields) => {
            if (err) {
              return connection.end().then(() => {
                throw err;
              });
              console.log('Couldn"t get users ');
            }
            res.send(results);
            connection.end();
          })
            .catch((error) => {
              console.log(error);
            });
        },
      );
  }
});

module.exports = router;
