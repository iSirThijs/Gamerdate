const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	email: String,
	username: String,
	hash: String,
	gender: String,
	games: [{type: mongoose.Schema.Types.Number, ref:'Game'}],
	match: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
	noMatch: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
	// games: Array
});


const User = mongoose.model('user', userSchema);

module.exports = User;
