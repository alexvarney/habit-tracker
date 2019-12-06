const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const habitRouter = require('./habits');


router.use('/user', usersRouter);
router.use('/habits', habitRouter);

module.exports = router;