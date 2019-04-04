const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	gender: String,
	games: Array,
	match: Array
});

module.exports = mongoose.model('User', userSchema);
