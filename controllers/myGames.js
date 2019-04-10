const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get('/', myGamesRender);
router.get('/', myGames);

function myGamesRender(req, res) {
	res.render('games/myGames.ejs', {
		data: [],
		user: req.session.user,
		error: false
	});

}

function myGames(req, res, next) {
	User.games.find(done);

	function done(err, game) {
		if (err) {
			next(err);
		} else {
			res.render('pages/profile', {
				game: game
			});
		}
	}
}



module.exports = router;
