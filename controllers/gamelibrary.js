const express = require('express');
const router = express.Router();
const gameSearch = require('./search.js');
const myGames = require('./myGames.js');
// const mongoose = require('mongoose');
const User = require('../model/user');
require('dotenv').config();

router
	.get('./', gamesRender)
	.use('/', gameSearch)
	.get('/', myGamesRender)
	.use('/', myGames)
	.post('/', addGame);
	
function gamesRender(req, res) {
	res.render('games/searchGames.ejs', {
		data: [],
		user: req.session.user,
		error: false
	});
}
function myGamesRender(req, res) {
	res.render('games/myGames.ejs', {
		data: [],
		user: req.session.user,
		error: false
	});
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

			res.redirect('/games/search');
		}
	}
}
module.exports = router;


