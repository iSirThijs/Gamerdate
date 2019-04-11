const mongoose = require('mongoose');
const User = require('../model/user.js');
const argon2 = require('argon2');
const queryString = require('querystring');

exports.enter = function (username, password){
	return new Promise(function(resolve, reject){

		mongoose.connect(process.env.MONGO_DB, {
			dbName: 'gamerdate',
			useNewUrlParser: true
		}); // make a connection to the database

		const db = mongoose.connection; // defines the connection

		db.on('error', (err) => reject(err) ); // on event emitter error, reject and send the error back
		db.once('open', async function(){
			let data = await User.find({ username: username });
			let user = data && data[0];

			let match = await argon2.verify(user.hash, password);

			if(match) resolve();
			else reject('Password don\'t match');
		});
	});
};

exports.require = function(req, res, next) {
	if (req.session.user) {
		next(); // if user is logged in, continue with the next callback on the route
	} else { //user isn't login
		const query = queryString.stringify({
			url: req.originalUrl
		}); //save the route/url the user wants to visit en make a querystring
		res.status(403).redirect('account/login?' + query); // sends the user to the login page and adds the orignal url as query
	}
};
