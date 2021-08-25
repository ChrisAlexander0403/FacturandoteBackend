const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     host: process.env.host,
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: process.env.user, // generated ethereal user
//         pass: process.env.pass, // generated ethereal password
//         //vhwkfuymlpxrekcl
//     },
//     tls: {rejectUnauthorized: false},
// });

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'chrisalexvazquez0211@gmail.com', // generated ethereal user
        pass: process.env.google, // generated ethereal password
        //vhwkfuymlpxrekcl
    }
});

transporter.verify().then( () => {
    console.log('Ready for send emails');
});

module.exports = transporter;