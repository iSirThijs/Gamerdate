const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../model/user');
//const Game = require('../model/game');

router
	.get('/', matchPage) //eslint-disable-line
	//.post('/:id', addMatch);

async function matchPage(req, res) {
	let id = req.session.user.id;
	let matches = await findMatches(id);
	let noDups = await rmDuplicates(matches);
	res.render(('matches.ejs'), {
		noDups
	});
}

function findMatches(id) {
	return new Promise(function(resolve) {
		mongoose.connect(process.env.MONGO_DB, {
			useNewUrlParser: true,
			dbName: 'gamerdate'
		});
		const db = mongoose.connection;
		db.on('error', (err, next) => next(err));
		db.once('open', async function() {
			// Find your own data
			let data = await User.findById(id);
			// Find the games in your game library and match it to others
			let matches = [];
			let userGames = data.games;
			let prevMatched = data.match;
			let matchDenied = data.noMatch;
			for (let i = 0; i < userGames.length; i++) {
				let game = userGames[i];
				matches.push(await User.find({
					$and: [{
						games: game
					}, {
						_id: {
							$ne: id,
							$nin: (prevMatched, matchDenied)
						}
					}]
				}).populate('games'));
			}
			console.log(userGames); //eslint-disable-line
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

// async function addMatch(req, res, next) {
// 	const value = req.body.match;
// 	const user = await User.findById(req.session.user.id);
//
// 	if (value === 'positive') {
// 		try {
// 			user.match.push(req.params.id);
// 			await user.save();
// 			res.redirect('/match');
// 		} catch (err) {
// 			next(err);
// 		}
// 	} else if (value === 'negative') {
// 		try {
// 			user.noMatch.push(req.params.id);
// 			await user.save();
// 			res.redirect('/match');
// 		} catch (err) {
// 			next(err);
// 		}
// 	}
// }


module.exports = router;
