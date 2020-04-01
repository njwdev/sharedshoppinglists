const express = require('express');

const router = express.Router();

//@route  GET api/account

//@dec Test route

//@access Public

router.get('/', (req, res) => res.send('Account route'));

module.exports = router;
