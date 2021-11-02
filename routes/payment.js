const express = require('express');
const { Payout } = require('../controllers/payment');
const router = express();

router.post('/payout',Payout)


module.exports = router;