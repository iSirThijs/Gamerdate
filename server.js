require('dotenv').config();

const bodyParser = require('body-parser');
// const multer = require('multer');
// const mongo = require('mongodb');
// const session = require('express-session');

// let db = null;
// let url = process.env.MONGODB;
//
// mongo.MongoClient.connect(url, function (err, client) {
// 	if (err) throw err;
// 	db = client.db(process.env.DB_NAME);
// });
//
// let upload = multer({
// 	dest: 'static/uploads/'
// });

const express = require('express');
const server = express();

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
	// .get('/chat', chat)
	.get('/', (req, res) => res.render('index.ejs'))
	// .get('/sign-up', renderSignup)
	// .get('/login', renderLogin)
	// .get('/profile', profile)
	// .post('/sign-up', signup)
	// .post('/login', login)
	// .post('/profile', upload.single('cover'), addGame)
	// .delete('/profile:id', removeGame)
	.use(notFound)
	.use(errorHandler)
	.listen(process.env.PORT || 8000);

// function renderHome(req, res) {
// 	res.render('pages/index');
// }
// function chat(req, res) {
// 	res.render('pages/chat');
// }
// function renderLogin(req, res) {
// 	res.render('pages/login');
// }
// function renderSignup(req, res) {
// 	res.render('pages/sign-up');
// }
// function profile(req, res, next) {
// 	db.collection('game').find().toArray(done);
// 	function done(err, game) {
// 		if (err) {
// 			next(err);
// 		} else {
// 			res.render('pages/profile', {
// 				game: game
// 			});
// 		}
// 	}
// }
// function addGame(req, res, next) {
// // var id = slug(req.body.title).toLowerCase()
//
// 	// if (!req.session.user) {
// 	//     res.status(401).send('Credentials required')
// 	//     return
// 	// } else {
// 	//     res.redirect('/sign-up')
// 	// }
// 	db.collection('game').insertOne({
// 		title: req.body.title,
// 		cover: req.file ? req.file.filename : null,
// 		description: req.body.description
// 	}, done);
// 	function done(err) {
// 		if (err) {
// 			next(err);
// 		} else {
// 			res.redirect('/profile');
// 		}
// 	}
// }
// function removeGame(req, res, next) {
// 	let id = req.params.id;
//
// 	// if (!req.session.user) {
// 	//     res.status(401).send('Credentials required')
// 	//     return
// 	// }
//
// 	db.collection('game').deleteOne({
// 		_id: mongo.ObjectID(id)
// 	}, done);
//
// 	function done(err) {
// 		if (err) {
// 			next(err);
// 		} else {
// 			res.json({status: 'ok'});
// 			res.redirect('/profile');
// 		}
// 	}
// }
// function signup(req, res, next) {
//
// 	db.collection('user').insertOne({
// 		username: req.body.username,
// 		password: req.body.password,
// 		console: req.body.description
// 	}, done);
//
// 	function done(err) {
// 		if (err) {
// 			next(err);
// 		} else {
// 			res.redirect('/profile');
// 		}
// 	}
// }
// function login(req, res) {
// 	let username = req.body.username;
// 	let password = req.body.password;
//
// 	db.collection('user').findOne({
// 		username: username,
// 		password: password
//
// 	}, done);
//
// 	function done(err, user) {
// 		if (user) {
// 			req.session.user = user;
// 			res.render('pages/login', {
// 				id: user._id,
// 				username: user.username
// 			});
//
// 		} else {
// 			res.json({
// 				status: 'ok'
// 			});
// 			res.status(401).send('Password incorrect');
// 		}
// 	}
// }

function notFound(req, res) {
	res.locals.code = 404;
	res.locals.message = 'Not found';
	res.status(404).render('error-page.ejs');
}

function errorHandler(err, req, res) {
	res.locals.code = 500;
	res.status(500).res.render('error-page.ejs');
}
