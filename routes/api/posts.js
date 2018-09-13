var express = require('express');
const router = express.Router();
const mysql = require('promise-mysql');
const keys = require('../../config/config');

router.get('/test', (req, res) => res.json({msg: 'posts works'}));

module.exports = router;
