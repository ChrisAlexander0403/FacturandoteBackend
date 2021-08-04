const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.host,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.user, // generated ethereal user
        pass: process.env.pass, // generated ethereal password
        //vhwkfuymlpxrekcl
    },
    tls: {rejectUnauthorized: false},
});

transporter.verify().then( () => {
    console.log('Ready for send emails');
});

module.exports = transporter;