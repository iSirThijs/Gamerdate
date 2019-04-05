require('dotenv').config();

const express = require('express');
const server = express();
const bodyParser = require('body-parser');
<<<<<<< HEAD
const matches = require('./controllers/matches.js');
=======
const session = require('express-session');

// Controllers
const account = require('./controllers/accounts.js');
const profile = require('./controllers/profile.js');
const match = require('./controllers/match.js');
>>>>>>> development

server
	.use('/static', express.static('./static'))
	.use(bodyParser.urlencoded({extended: true}))
	.use(session({
		resave: false,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET
	}))
	.set('view engine', 'ejs')
	.set('views', './views')
	.use(setLocals)
	.get('/', (req, res) => res.render('index.ejs'))
<<<<<<< HEAD
	.use('/match', matches )
=======
	.use('/account', account)
	.use('/profile', profile)
	.use('/match', match)
>>>>>>> development
	.use(notFound)
	.use(errorHandler)
	.listen(process.env.PORT || 8000);


function notFound(req, res) {
	res.locals.code = 404;
	res.locals.message = 'Not found';
	res.status(404).render('error-page.ejs');
}

function errorHandler(err, req, res) {
	res.locals.code = 500;
	res.status(500).res.render('error-page.ejs');
}

function setLocals(req, res, next) {
	if (req.session.user) {
		res.locals.user = req.session.user;
		next();
	} else {
		res.locals.user = false;
		next();
	}
}
