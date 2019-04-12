const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../model/user');
const accountUtil = require('../utilities/accountUtil.js');

router
	.get('/', matchPage)
	.post('/accept/:id', (req, res, next) => accountUtil.acceptMatch(req, res, next))
	.post('/deny/:id', (req, res, next) => accountUtil.denyMatch(req, res, next));

async function matchPage(req, res) {
<<<<<<< HEAD
	let id = req.session.user.id;
	let matches = await findMatches(id);
	let noDups = await rmDuplicates(matches);
	req.session.matchID = noDups;
	res.render(('matches.ejs'), {
		noDups
	});
}

function findMatches(id) {
	return new Promise(function(resolve) {
=======
	try {
		let id = req.session.user.id;
		let matches = await findMatches(id);
		let noDups = await rmDuplicates(matches);
		req.session.matchID = noDups;
		res.render(('matches.ejs'), {
			noDups
		});
	} catch(err) {
		res.render(('matches.ejs'), {
			noDups: err
		});
	}

}

function findMatches(id) {
	return new Promise(function(resolve, reject) {
>>>>>>> development
		mongoose.connect(process.env.MONGO_DB, {
			useNewUrlParser: true,
			dbName: 'gamerdate'
		});
		const db = mongoose.connection;
		db.on('error', (err, next) => next(err));
		db.once('open', async function() {
<<<<<<< HEAD
			// Find your own data
			let data = await User.findById(id);
			// Find the games in your game library and match it to others



			let prevMatched = [data.match, data.noMatch].reduce((accumulator, currentValue) =>
				accumulator.concat(currentValue), []);

			let matches = [];
			let userGames = data.games;
			for (let i = 0; i < userGames.length; i++) {
				let game = userGames[i];
				matches.push(await User.find({
					$and: [{
						games: game
					}, {
						_id: {
							$ne: id,
							$nin: prevMatched
						}
					}]
				}).populate('games'));
			}
			let flatMatch = matches.flat();
			resolve(flatMatch);
=======
			try {
				let data = await User.findById(id);
				let prevMatched = [data.match, data.noMatch].reduce((accumulator, currentValue) =>
					accumulator.concat(currentValue), []);

				let matches = [];
				let userGames = data.games;
				for (let i = 0; i < userGames.length; i++) {
					let game = userGames[i];
					matches.push(await User.find({
						$and: [{
							games: game
						}, {
							_id: {
								$ne: id,
								$nin: prevMatched
							}
						}]
					}).populate('games'));
				}
				let flatMatch = matches.reduce((accumulator, currentValue) =>
					accumulator.concat(currentValue), []);
				resolve(flatMatch);
			} catch(err) {
				reject([]);
			}



			// Find your own data

			// Find the games in your game library and match it to others


>>>>>>> development
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
					id: item._id,
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

module.exports = router;
