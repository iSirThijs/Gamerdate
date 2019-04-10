const express = require('express');
const router = express.Router();

const gamesUtil = require('../utilities/gamesUtil.js');

router
	.get('/', (req, res) => res.render('games/myGames.ejs'), { data: [] }) // profile/games
	.get('/search', (req, res) => res.render('games/searchGames.ejs'), { data: [] })
	.get('/search/query?', searchResult );

async function searchResult(req, res) {
	const results = await gamesUtil.cards(req.query.q);
	res.render('/games/searchGames.ejs', {data: results});
}
















async function addGame(req, res, next) {

};


module.exports = router;
