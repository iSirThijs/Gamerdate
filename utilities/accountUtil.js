const mongoose = require('mongoose');
const User = require('../model/user.js');
const argon2 = require('argon2');

exports.create = function (userInfo){
	return new Promise(function(resolve, reject){
		let {name, lastname, email, username, password, gender} = userInfo; //object destructuring

		mongoose.connect(process.env.MONGO_DB, {
			dbName: 'gamerdate',
			useNewUrlParser: true
		}); // make a connection to the database

		const db = mongoose.connection; // defines the connection

		db.on('error', (err) => reject(err) ); // on event emitter error, reject and send the error back
		db.once('open', async function(){
			let newUser = new User({
				name: name,
				lastname: lastname,
				email: email,
				username: username,
				hash: await argon2.hash(password),
				gender: gender,
				games: [],
				match: []
			}); // once database is open(open is event emitter) create a user with the values from the form
			newUser.save(function(err, user){ // save the user and use the callback if done
				if (err) reject(err); // if there is an error reject the promise and send the error back
				else resolve(user); // if there is not an error resolve the promise
			});
		});
	});
};

exports.addGame = function(userID, gameID){
	return new Promise(function (resolve, reject) {

		mongoose.connect(process.env.MONGO_DB, {
			dbName: 'gamerdate',
			useNewUrlParser: true
		}); // make a connection to the database

		const db = mongoose.connection; // defines the connection

		db.on('error', (err) => reject(err)); // on event emitter error, reject and send the error back
		db.once('open', async function () {
			try {
				const user = await User.findById(userID);

				user.games.push(gameID);
				await user.save();
				resolve();
			} catch(err) {
				reject(err);
			}
		});
	});
};
exports.myGame = function(userID) {
	return new Promise(async function (resolve, reject) {
		try {
			const user =
			await User
				.findById(userID)
				.select('games')
				.populate('games');
			resolve(user.games);
		} catch (err) {
			reject({
				type: 'error'
			});
		}
	});
};