const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/user');
// const id = mongoose.ObjectId;

router
	.get('/', matchPage);

async function matchPage(req, res) {
	let matches = await findMatches();
	let noDups = await rmDuplicates(matches);
	console.log(noDups); //eslint-disable-line
	res.render(('matches.ejs'), {
		noDups
	});
}


function findMatches() {
	return new Promise(function(resolve) {
		mongoose.connect(process.env.MONGO_DB, {
			useNewUrlParser: true,
			dbName: 'Gamerdate'
		});
		const db = mongoose.connection;
		db.on('error', (err, next) => next(err));
		db.once('open', async function() {
			// Find your own data
			let data = await User.find({
				username: 'JakeP'
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
							$ne: 'JakeP'
						}
					}]
				}));
			}
			let flatMatch = matches.flat();
			resolve(flatMatch);
		});
	});
}

function rmDuplicates(arr){
	return new Promise(function(resolve){
		const result = [];
		const map = new Map();
		for (const item of arr) {
			if(!map.has(item.id)){
				map.set(item.id, true);    // set any value to Map
				result.push({
					username: item.username,
					games: item.games
				});
			}
		}
		resolve(result);
	});

}


module.exports = router;
