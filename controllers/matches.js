const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/user');

router
	.get('/', matchPage);

async function matchPage(req, res) {
	let matches = await findMatches();
	console.log(matches); //eslint-disable-line
	res.render(('matches.ejs'), {
		matches
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
				matches.push(await User.find({ $and:[
					{ games: game } , {username:{$ne: 'JakeP'}}
				]}));
			}
			let flatMatch = matches.flat();
			resolve(flatMatch);
		});
	});
}

module.exports = router;
