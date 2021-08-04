const { Router } = require('express');
const router = Router();
const { sendContactMail, sendDistributorMail, sendPaymentMail, uploadVoucher } = require('../controllers/mails.controller');

router.route('/contact')
    .post(sendContactMail);
router.route('/distributor')
    .post(sendDistributorMail);
router.route('/paymentSucceeded')
    .post(sendPaymentMail);
router.route('/uploadVoucher')
    .post(uploadVoucher);

module.exports = router;