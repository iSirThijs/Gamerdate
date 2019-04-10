const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	email: String,
	username: String,
	hash: String,
	gender: String,
	//games: [{type: mongoose.Schema.Types.Number, ref:'Game'}],
	games:Array,
	match: Array
});

const User = mongoose.model('User', userSchema);

module.exports = User;
