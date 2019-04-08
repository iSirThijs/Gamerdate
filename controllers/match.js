const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../model/user');

router
	.get('/', matchPage)
	.post('/:id', addMatch);

async function matchPage(req, res) {
	const userLoggedIn = res.locals.user;
	let matches = await findMatches(userLoggedIn);
	let noDups = await rmDuplicates(matches);
	console.log(noDups); //eslint-disable-line
	res.render(('matches.ejs'), {
		noDups
	});
}


function findMatches(userLoggedIn) {
	return new Promise(function(resolve) {
		mongoose.connect(process.env.MONGO_DB, {
			useNewUrlParser: true,
			dbName: 'gamerdate'
		});
		const db = mongoose.connection;
		db.on('error', (err, next) => next(err));
		db.once('open', async function() {
			// Find your own data
			let data = await User.find({
				username: userLoggedIn
			});
			// Find the games in your game library and match it to others
			let matches = [];
			let userGames = data[0].games;
			for (let i = 0; i < userGames.length; i++) {
				let game = userGames[i];
				matches.push(await User.find({
					$and: [{
						games: game
					}, {
						username: {
							$ne: userLoggedIn
						}
					}]
				}));
			}
			let flatMatch = matches.flat();
			resolve(flatMatch);
		});
	});
}

// following code used from https://codeburst.io/javascript-array-distinct-5edc93501dc4
function rmDuplicates(arr) {
	return new Promise(function(resolve) {
		const result = [];
		const map = new Map();
		for (const item of arr) {
			if (!map.has(item.id)) {
				map.set(item.id, true);
				result.push({
					name: item.name,
					lastname: item.lastname,
					games: item.games,
					username: item.username
				});
			}
		}
		resolve(result);
	});
}

async function addMatch(req, res) {
	const userLoggedIn = res.locals.user;
	await User.update(
		{username: userLoggedIn},
		{$push: { match: req.params.id}});
	console.log('succesful push'); //eslint-disable-line
	res.redirect('/match');
}

module.exports = router;
