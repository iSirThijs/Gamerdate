
const express = require('express');
const router = express.Router();
const gameSearch = require('./search.js');



router
	.get('./', gamesRender)
	.use('/', gameSearch);
function gamesRender(req, res) {
	res.render('games/games.ejs', { data: req.data});
}




module.exports = router;

