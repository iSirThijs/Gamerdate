const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
	_id: Number,
	title: String,
<<<<<<< HEAD
=======
	img: String
>>>>>>> development
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;
