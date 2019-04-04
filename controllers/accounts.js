const express = require('express');
const router = express.Router();

router
	.get('/register', (req, res) => res.render('accounts/register.ejs'))
	.get('/', account)
	.post('/', add);

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
