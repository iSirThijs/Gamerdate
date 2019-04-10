const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	email: String,
	username: String,
	hash: String,
	gender: String,
<<<<<<< HEAD
	games: [{type: mongoose.Schema.Types.Number, ref:'Game'}],
	match: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
	noMatch: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
	// games: Array
=======
	games : [{ type: Schema.Types.Number, ref: 'Game'}],
>>>>>>> development
});


<<<<<<< HEAD
const User = mongoose.model('user', userSchema);

=======
>>>>>>> development
module.exports = User;
