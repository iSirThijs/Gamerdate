const mongoose = require('mongoose');


const SingleGameSchema = new mongoose.Schema({
	_id: Number,
	title: String,
	img: String

});

module.exports = mongoose.model('SingleGame', SingleGameSchema);
