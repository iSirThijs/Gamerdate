const express = require('express');
const router = express.Router();

// required utilities
const accountUtil = require('../utilities/accountUtil.js');
const loginUtil = require('../utilities/loginUtil.js');


router
	.get('/register', (req, res) => res.render('accounts/register.ejs'))
	.post('/register', registerAccount )
	.get('/', (req, res) => res.render('accounts/account.ejs', {data: []}))
	.get('/login', (req, res) => res.render('accounts/login.ejs'))
	.post('/login', login)
	.get('/signout', signout);

async function registerAccount(req, res, next) {
	const userInfo = req.body;

	try {
		await accountUtil.create(userInfo) ;
		req.session.user = req.body.username;
		res.redirect('/');
	} catch(err) {
		next(err);
	}
}

async function login(req,res,next) {
	let {username, password} = req.body;
	try{
		await loginUtil.enter(username, password);
		req.session.user = req.body.username;
		res.redirect('/');
	} catch(err) {
		next(err);
	}
}

function signout(req, res,) {
	req.session.destroy();
	res.redirect('/');
}

module.exports = router;
