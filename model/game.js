const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
	_id: Number,
	title: String,
	img: String
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
