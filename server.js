require('dotenv').config();

const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const games = require('./controllers/gamelibrary.js');

server
	.use('/static', express.static('./static'))
	.set('view engine', 'ejs')
	.set('views', './views')
	.use(bodyParser.urlencoded({extended: true}))
	// .use(session({
	// 	resave: false,
	// 	saveUninitialized: true,
	// 	secret: process.env.SESSION_SECRET
	// }))
	.use('/games', games)
	.get('/', (req, res) => res.render('index.ejs'))
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

