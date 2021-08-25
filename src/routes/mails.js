const { Router } = require('express');
const router = Router();
const { sendContactMail, sendDistributorMail, sendDepositPaymentMail, sendCardPaymentMail, uploadVoucher } = require('../controllers/mails.controller');

router.route('/contact')
    .post(sendContactMail);
router.route('/distributor')
    .post(sendDistributorMail);
router.route('/depositPaymentSucceeded')
    .post(sendDepositPaymentMail);
router.route('/cardPaymentSucceeded')
    .post(sendCardPaymentMail);
router.route('/uploadVoucher')
    .post(uploadVoucher);

module.exports = router;