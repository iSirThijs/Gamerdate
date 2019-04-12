const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');
const games = require('./gamelibrary');
require('dotenv').config();

router
	.get('/', showProfile)
	.use('/games', games);

async function showProfile(req, res) {
	try {
		let id = req.session.user.id;
		let data = await findUser(id);
		res.render(('profile/profile-page.ejs'), {
			data
		});
	} catch(err) {
		res.render(('profile/profile-page.ejs'), {
			data: err
		});
	}
}

function findUser(id) {
	return new Promise(function(resolve, reject) {
		mongoose.connect(process.env.MONGO_DB, {
			useNewUrlParser: true,
			dbName: 'gamerdate'
		});
		const db = mongoose.connection;
		db.on('error', (err, next) => next(err));
		db.once('open', async function() {
			try {
				let data = await User.findById(id).populate('games').populate('match');
				console.log(data); //eslint-disable-line
				resolve(data);
			} catch (err) {
				reject([]);
			}
		});
	});
}

module.exports = router;
