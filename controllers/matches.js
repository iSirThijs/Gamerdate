const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/user');

router
	.get('/', matchPage);

async function matchPage (req, res) {
	let matches = await findMatches();
	res.render(('matches.ejs'), {matches});
}


function findMatches() {
	return new Promise(function(resolve) {
		mongoose.connect(process.env.MONGO_DB, {
			useNewUrlParser: true,
			dbName: 'Gamerdate'
		});
		const db = mongoose.connection;
		db.on('error', (err, next) => next (err));
		db.once('open', async function(){
			// Find your own data
			let data = await User.find({username: 'JakeP'});
			// Find the first game in your game array and match it to others
			let userGames =data[0].games;
			let game =userGames[0];
			let matches = await User.find({ games:game });
			// Exclude yourself from the array of matches
			for (let i =0; i < matches.length; i++)
				if (matches[i].username === 'JakeP') {
					matches.splice(i,1);}
			resolve(matches);
		});
	});
}




module.exports = router;
