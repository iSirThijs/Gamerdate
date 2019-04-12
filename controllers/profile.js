const express = require('express');
const router = express.Router();

const games = require('./gamelibrary');

router
	.get('/', (req, res) => res.redirect('/profile/games'))
	.use('/games', games);


module.exports = router;
