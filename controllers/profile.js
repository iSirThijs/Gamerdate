const express = require('express');
const router = express.Router();

const games = require('./gamelibrary');

router
	.use('/games', games);


module.exports = router;
