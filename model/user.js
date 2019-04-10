const mongoose = require('mongoose');

const SingleGame = require('./singleGame');
const userSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	email: String,
	username: String,
	hash: String,
	gender: String,
	games : [SingleGame.Schema],
	match: Array
});

const User = mongoose.model('User', userSchema);

module.exports = User;