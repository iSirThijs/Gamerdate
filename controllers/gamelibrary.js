const express = require('express');
const router = express.Router();

router
	.get('/', (req, res) => res.send('hallo')); 


module.exports = router;
