const express = require('express');
const router = express.Router();
const gameSearch = require('./search.js');
// const mongoose = require('mongoose');
const User = require('../model/user');
require('dotenv').config();

router
	.get('./', gamesRender)
	.use('/', gameSearch)
	.post('/', addGame);
	
function gamesRender(req, res) {
	res.render('games/games.ejs', { data: req.data});
}

async function addGame(req, res, next) {
	const userLoggedIn = res.locals.user;
	await User.findOneAndUpdate({
		username: userLoggedIn
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