const express = require('express');
const router = express.Router();

const gamesUtil = require('../utilities/gamesUtil.js');
const accountUtil = require('../utilities/accountUtil.js');

router
	.get('/', myGames )
	.get('/search', (req, res) => res.render('./games/searchGames.ejs', { data: [] }))
	.get('/search/query?', searchResult )
	.post('/add/:id', addGame)
	.post('/delete/:id', deleteGame);
	
async function searchResult(req, res, next) {
	try {
		const results = await gamesUtil.cards(req.query.q);
		res.render('./games/searchGames.ejs', {data: results});
	} catch(err) {
		next(err);
	}
}
async function addGame(req, res, next) {
	const userID = req.session.user.id;
	const gameID = req.params.id;

	try {
		const checkExist = await gamesUtil.findGameById(gameID);
		const game = await gamesUtil.cardByID(gameID);
		if(!checkExist) {
			await gamesUtil.save(game);
		}
		await accountUtil.addGame(userID, gameID);
		res.redirect('/profile/games');

	} catch(err){
		next(err);
	}
}
async function deleteGame(req, res, next) {
	const userID = req.session.user.id;
	const gameID = req.params.id;
	try {
		await accountUtil.deleteGame(userID, gameID);
		res.redirect('/profile/games');
	} catch(err){
		next(err);
	}
}
async function myGames(req, res, next){
	let data = [];
	const userID = req.session.user.id;
	try {
		data = await accountUtil.myGame(userID);
		res.render('./games/myGames.ejs', {data: data });
	} catch(err) {
		next(err);
	}
}
module.exports = router;



