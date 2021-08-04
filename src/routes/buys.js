const { Router } = require('express');
const router = Router();
const { buy } = require('../controllers/buys.controller');

router.route('/')
    .post(buy)

module.exports = router;