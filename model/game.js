const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const gameSchema = new mongoose.Schema({
	id: ObjectId,
	title: String,
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;
