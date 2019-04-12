// inspiration and help from https://github.com/iSirThijs/Player2/blob/development/utils/gamesUtil.js

const igdbApi = require('./igdbApiUtil.js');
const mongoose = require('mongoose');

// Models
const Game = require('../model/game.js');

exports.cards = async function (query) {
	if (!query || query.length === 0) {
		throw new Error('Please provide a search querry');
	} else {
		try {
			const promises = [];
			const games = await igdbApi.findGames(query);

			for (let i = 0; i < games.length; i++) {
				promises.push(
					new Promise(async function (resolve) {
						const gameCard = {
							id: games[i].id,
							title: games[i].name,
							img: await igdbApi.coverLink(games[i].cover, 'cover_small')
						};
						resolve(gameCard);
					})
				);
			}
			const gameCards = await Promise.all(promises);
			return gameCards;
		} catch (err) {
			throw err;
		}
	}
};
exports.cardByID = async function(gameID) {
	try {
		const result = await igdbApi.findGameById(gameID);
		const game = result && result[0];

		if(game) {
			const gameCard = {
				id: game.id,
				title: game.name,
				img: await igdbApi.coverLink(game.cover, 'cover_small')
			};
			return gameCard;
		} else throw new Error;
	} catch(err){
		throw err;
	}
};

exports.findGameById = function(gameID) {
	return new Promise(function(resolve, reject){

		mongoose.connect(process.env.MONGO_DB, {
			dbName: 'gamerdate',
			useNewUrlParser: true
		});

		const db = mongoose.connection;

		db.on('error', (err) => reject(err));
		db.once('open', async function(){
			try {
				let game = Game.findGameById(gameID);
				resolve(game);
			} catch(err){
				resolve(false);
			}
		});

	});
};
exports.save = function (game) {
	return new Promise(function (resolve, reject) {

		const {id, title, img} = game; //object destructure

		mongoose.connect(process.env.MONGO_DB, {
			dbName: 'gamerdate',
			useNewUrlParser: true
		});

		const db = mongoose.connection;

		db.on('error', (err) => reject(err));
		db.once('open', async function () {
			try {
				let newGame = new Game({
					_id: id,
					title: title,
					img: img
				});
				newGame.save(function (err, game) { // save the game and use the callback if done
					if (err) reject(err); // if there is an error reject the promise and send the error back
					else resolve(game); // if there is not an error resolve the promise
				});
			} catch(err){
				reject(err);
			}
		});
	});
};
