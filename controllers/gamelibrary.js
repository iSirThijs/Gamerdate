const express = require('express');
const router = express.Router();
const gameSearch = require('./search.js');

const User = require('../model/user');

router
	.get('./', gamesRender)
	.use('/', gameSearch)
	.post('/', addGame);
	
function gamesRender(req, res) {
	res.render('games/games.ejs', { data: req.data});
}

function addGame(req, res, next) {
	User.findOneAndUpdate({
		_id: req.user._id
	}, {
		$push: {
			games: req.body.games

		}
	}, done);

	function done(err) {
		if (err) {
			next(err);
		} else {

			res.redirect('/games');
		}
	}
}


module.exports = router;

