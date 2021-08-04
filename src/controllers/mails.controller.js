const mailsController = {};
const { application } = require('express');
const transporter = require('../config/mailer');
const validations = require('../validations');
const path = require('path');
const fs = require('fs');

//send Email

mailsController.sendContactMail = async (req, res) => {
    try {
        validations.contactMailValidation(req.body);
        const { name, email, phone, content } = req.body;
        await transporter.sendMail({
            from: '"Facturándote" <soporte@facturandote.com>', // sender address
            to: "soporte@facturandote.com", // list of receivers
            subject: "Contacto", // Subject line
            text: "Nuevo contacto", // plain text body
            html: `
            <b>Nombre: </b>${name}<br>
            <b>Email: </b>${email}<br>
            <b>Celular: </b>${phone}<br>
            <b>Comentario: </b>${content}<br>
            `, // html body
        });
        res.json({ message: 'Mail saved' });
    } catch (error) {
        console.log(error);
        res.json({ message: error.inner });
    }
}
mailsController.sendDistributorMail = async (req, res) => {
    try {
        validations.distributorMailValidation(req.body);
        const { enterprise, address, city, state, name, phone, email, message } = req.body;
        await transporter.sendMail({
            from: '"Facturándote" <soporte@facturandote.com>', // sender address
            to: "soporte@facturandote.com", // list of receivers
            subject: "Quiero ser distribuidor", // Subject line
            text: "Quiero ser distribuidor", // plain text body
            html: `
                <b>Empresa o razón social: </b>${enterprise}
                <b>Dirección: </b>${address}
                <b>Municipio: </b>${city}
                <b>Estado: </b>${state}
                <b>Nombre: </b>${name}
                <b>Email: </b>${email}
                <b>Celular: </b>${phone}
                <b>Mensaje: </b>${message}
            `, // html body
        });
        res.json({ message: 'Mail saved' });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

mailsController.uploadVoucher = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    try {
        let file = req.files.file;
        let uploadPath = path.join(__dirname, '../vouchers/' + file.name);
        file.mv(uploadPath);
        return res.json({ filename: file.name, uploadPath: uploadPath})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "error.message"
        })
    }
}

mailsController.sendPaymentMail = async (req, res) => {
    try {
        validations.paymentInfoValidation(req.body);
        const { name, enterprise, rfc, email, reason, cfdi, price, filename, uploadPath } = req.body;
        console.log(req.body);
        await transporter.sendMail({
            from: '"Facturándote" <soporte@facturandote.com>', // sender address
            to: `${email}, soporte@facturandote.com`, // list of receivers
            subject: "Comprobante", // Subject line
            text: "Su comprobante de pago fue enviado con éxito", // plain text body
            html: `
            <b>Nombre: </b>${name}<br>
            <b>Empresa: </b>${enterprise}<br>
            <b>RFC: </b>${rfc}<br>
            <b>Email: </b>${email}<br>
            <b>Razón Social: </b>${reason}<br>
            <b>CFDI: </b>${cfdi}<br>
            <b>Precio: </b>${price}<br>
            `, // html body
            attachments: [{ 
                filename: filename, 
                path: uploadPath,
                
            }]
        });
        fs.unlinkSync(uploadPath);
        res.json({ msg: 'Mail saved' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "error.message"
        })
    }
}

module.exports = mailsController;