const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	email: String,
	username: String,
	password: String,
	gender: String
});

const User = mongoose.model('User', userSchema)

module.exports = User;