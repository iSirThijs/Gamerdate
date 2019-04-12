const express = require('express');
const router = express.Router();
const queryString = require('querystring');

// required utilities
const accountUtil = require('../utilities/accountUtil.js');
const loginUtil = require('../utilities/loginUtil.js');


router
	.get('/register', (req, res) => res.render('accounts/register.ejs'))
	.post('/register', registerAccount)
	.get('/', (req, res) => res.redirect('/profile'))
	.get('/login', loginPage)
	.post('/login', login)
	.get('/signout', signout);

async function registerAccount(req, res, next) {
	const userInfo = req.body;

	try {
		let user = await accountUtil.create(userInfo);
		req.session.user = {
			username: user.username,
			id: user._id
		};
		res.redirect('/');
	} catch (err) {
		next(err);
	}
}

async function login(req, res, next) {

	let { username, password } = req.body;

	try {
		let result = await loginUtil.enter(username, password);
		let { match, user } = result;

		if (match) {
			req.session.user =
				{
					username: user.username,
					id: user._id
				};
			res.redirect(req.query.url || '/'); // redirect the user to the page it wants or the home if it hasn't
		} else {
			let err = 'passwords don\'t match';
			next(err);
		}
	} catch (err) {
		next(err);
	}
}


function loginPage(req, res) {
	const query = queryString.stringify(req.query);
	res.locals.query = query; // gives the query with the url of the page the user want to vist to EJS so the login button can redirect to the page
	res.render('accounts/login.ejs');
}

function signout(req, res, ) {
	req.session.destroy();
	res.redirect('/');
}

module.exports = router;
