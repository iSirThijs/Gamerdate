const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	email: String,
	username: String,
	hash: String,
	gender: String,
	games : [{ type: Schema.Types.Number, ref: 'Game'}],
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
