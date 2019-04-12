const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
	name: String,
	lastname: String,
	email: String,
	username: String,
	hash: String,
	gender: String,
	games: [{type: Schema.Types.Number, ref:'Game'}],
	match: [{type: Schema.Types.ObjectId, ref:'User'}],
	noMatch: [{type: Schema.Types.ObjectId, ref:'User'}]
	// games: Array
});

const User = mongoose.model('User', userSchema);
module.exports = User;
