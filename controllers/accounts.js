const express = require('express');
const router = express.Router();

router
	.get('/', account );
function account(req, res) {
	res.render('account.pug', {data:account});
}
	





module.exports = router;
