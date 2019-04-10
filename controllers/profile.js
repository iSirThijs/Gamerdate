const express = require('express');
const router = express.Router();

const games = require('./gamelilbrary');

router
	.use('/games', games);


module.exports = router;
