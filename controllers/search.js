const express = require('express');
const router = express.Router();

const gameCards = require('../utilities/gamecards');

router.get('/', searchZero);
router.get('/query?', renderResults);

function searchZero(req, res) {
	res.render('games/games.ejs', {
		data: [],
		user: req.session.user,
		error: false
	});
}

async function renderResults(req, res) {
	try {
		const results = await gameCards.create(req.query.q);
		const renderData = {
			data: results,
			gituser: req.session.user,
			error: false
		};
		res.render('games/games.ejs', renderData);
	} catch (err) {
		const renderData = {
			data: [],
			user: req.session.user,
			error: {
				message: err.message
			}
		};
		res.render('games/games.ejs', renderData);
	}
}




module.exports = router;