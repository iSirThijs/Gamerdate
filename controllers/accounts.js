const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user.js');

router
	.get('/register', (req, res) => res.render('accounts/register.ejs'))
	.post('/register', registerAccount )
	.get('/', account)
	.get('/login', (req, res) => res.render('accounts/login.ejs'))
	.post('/', add);


async function registerAccount(req, res, next) {
	try {
		await createAccount(req);
		res.redirect('/');
	} catch(err) {
		next(err);
	}
}

function createAccount(req){
	return new Promise(function(resolve, reject){
		let {name, lastname, email, username, password, gender} = req.body; //object destructuring 
		console.log(req.body); //eslint-disable-line

		mongoose.connect(process.env.MONGO_DB, { 
			dbName: 'gamerdate',
			useNewUrlParser: true
		}); // make a connection to the database

		const db = mongoose.connection; // defines the connection

		db.on('error', (err) => reject(err) ); // on event emitter error, reject and send the error back
		db.once('open', function(){
			let newUser = new User({
				name: name,
				lastname: lastname,
				email: email,
				username: username,
				password: password,
				gender: gender
			}); // once database is open(open is event emitter) create a user with the values from the form
			newUser.save(function(err){ // save the user and use the callback if done
				if (err) reject(err); // if there is an error reject the promise and send the error back
				else resolve(); // if there is not an error resolve the promise
			});
		});
	});
}










function account(req, res) {
	res.render('accounts/account.ejs', { data: data [1]});
}
	
let data = [
	{
		name: 'Emma',
		lastname: 'Oudmaijer',
		email: 'Emmaoudmaijer@hva.nl',
		username: 'EmmaO',
		gender: 'Women'
	},
	{
		name: 'Youp',
		lastname: 'Schaefers',
		email: 'youpschaefers@gmail.com',
		username: 'youpS',
		gender: 'Man'
	}
];

function add(req, res){
	data.push({
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		username: req.body.username,
		gender: req.body.gender
	});
	res.redirect('/account');
}

module.exports = router;
