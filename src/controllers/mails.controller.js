const mailsController = {};
const transporter = require("../config/mailer");
const validations = require("../validations");
const path = require("path");
const fs = require("fs");
const numeral = require("numeral");

//send Email

mailsController.sendContactMail = async (req, res) => {
  try {
    validations.contactMailValidation(req.body);
    const { name, email, phone, content } = req.body;
    await transporter.sendMail({
      from: '"Facturándote" <soporte@facturandote.com>', // sender address
      to: "soporte@facturandote.com", // list of receivers
      subject: "Quiero ser distribuidor", // Subject line
      text: "Quiero ser distribuidor", // plain text body
      html: `
                <b>Nombre: </b>${name}
                <b>Email: </b>${email}
                <b>Celular: </b>${phone}
                <b>Mensaje: </b>${content}
            `, // html body
    });
    await transporter.sendMail({
      from: '"Facturándote" <soporte@facturandote.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Contacto", // Subject line
      text: "Nuevo contacto", // plain text body
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" >
              <title>HTML Email</title> <!-- Not Needed, Erase -->
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
              <style type="text/css">
                  body{
                      margin: 0;
                      padding: 0;
                      background-color: #f6f9fc;
                      font-family: 'Sora', sans-serif;
                  }
                  table{
                      border-spacing: 0;
                  }
                  td{
                      padding: 0;
                  }
                  img{
                      border: 0;
                  }
                  .wrapper{
                      width: 100%;
                      table-layout: fixed;
                      background-color: #f6f9fc;
                      padding-bottom: 40px;
                  }
                  .webkit{
                      max-width: 600px;
                      background-color: #181818;
                  }
                  .outer{
                      margin: 0;
                      width: 100%;
                      max-width: 600px;
                      border-spacing: 0;
                  }
                  .padding{
                      padding: 15px 30px;
                      color: #ffffff;
                  }
                  .mailbody{
                      color: #ffffff;
                      padding: 0 30px 15px;
                  }
                  .details{
                      color: #ffef00;
                  }
                  @media screen and (max-width: 600px){
      
                  }
                  @media screen and (max-width: 400px){
                      
                  }
              </style>
          </head>
          <body>
              <center class="wrapper">
                  <div class="webkit">
                      <table class="outer" align="center">
                          <tr>
                              <td>
                                  <table width="100%" style="border-spacing: 0; border-bottom: 1px solid #ffef00">
                                      <tr>
                                          <td style="background-color: #181818; padding: 10px; text-align: center;">
                                              <a href="http://facturandote.com/"><img src="https://i.ibb.co/RjVTYdD/Facturandote-Logo.png" width="180px" alt="Facturándote" title="Facturándote"></a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="100%" style="border-spacing: 0; border-bottom: 1px solid #ffef00;">
                                      <tr>
                                          <td class="padding">
                                              <table align="center" class="details">
                                                  <tr>
                                                      <td><p style="font-size: 18px; font-weight: 500;">Gracias por ponerte en contacto con nosotros</p></td>
                                                  </tr>
                                                  <tr>
                                                      <td><p style="color: #ffffff; padding: 0 30px;">Estimado ${name}:</p></td>
                                                  </tr>
                                                  <tr>
                                                      <td><p class="mailbody">En breve un miembro de nuestro equipo se pondrá en contacto con usted por el asunto:</p></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          <p style="color: #ffffff; padding: 0 45px;"><i>"${content}"</i></p>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td><p class="mailbody" style="text-align: right;">El Equipo de Soporte</p></td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="100%" style="border-spacing: 0; border-bottom: 1px solid #ffef00;">
                                      <tr>
                                          <td style="background-color: #181818; padding: 15px; text-align: center;">
                                          <p style="font-size: 18px; color: #ffef00; margin-bottom: 13px;">Conecta con nosotros</p>
                                              <a href="https://www.facebook.com/Facturandote.mx"><img src="https://i.ibb.co/jy49J6p/white-facebook.png" width="30px" alt="Facebook"></a>
                                              <a href="https://twitter.com/Facturandote_"><img src="https://i.ibb.co/Y2VR1pS/white-twitter.png" width="30px" alt="Twitter"></a>
                                              <a href="https://www.youtube.com/channel/UC7mwcwBS4ECDZBzOxx9xwQQ"><img src="https://i.ibb.co/QbLzTgf/white-youtube.png" width="30px" alt="Youtube"></a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="100%" style="background-color: #181818; border-spacing: 0; color: #ffffff; font-size: 14px;">
                                      <tr>
                                          <td style="padding: 20px; text-align: center;">
                                              <a href="http://facturandote.com/"><img src="https://i.ibb.co/RjVTYdD/Facturandote-Logo.png" width="150px" alt="Facturándote" title="Facturándote"></a>
                                              <p style="margin-top: 18px;">20 #277 Miguel Alemán, Mérida, Yucatán, 97148.</p>
                                              <p style="margin-top: 18px; color: #ffef00; text-decoration: none;">soporte@facturandote.com</p>
                                              <p style="margin-top: 18px; color: #ffef00;">+52 999-927-5000</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </div>
              </center>
          </body>
      </html>
            `, // html body
    });
    res.json({ message: "Mail saved" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.inner });
  }
};
mailsController.sendDistributorMail = async (req, res) => {
  try {
    validations.distributorMailValidation(req.body);
    const { enterprise, address, city, state, name, phone, email } =
      req.body;
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
            `, // html body
    });
    await transporter.sendMail({
      from: '"Facturándote <soporte@facturandote.com">',
      to: `${email}`,
      subject: "Solicitud de distribuidor",
      text: "Solicitud de distribuidor",
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" >
              <title>HTML Email</title> <!-- Not Needed, Erase -->
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
              <style type="text/css">
                  body{
                      margin: 0;
                      padding: 0;
                      background-color: #f6f9fc;
                      font-family: 'Sora', sans-serif;
                  }
                  table{
                      border-spacing: 0;
                  }
                  td{
                      padding: 0;
                  }
                  img{
                      border: 0;
                  }
                  .wrapper{
                      width: 100%;
                      table-layout: fixed;
                      background-color: #f6f9fc;
                      padding-bottom: 40px;
                  }
                  .webkit{
                      max-width: 600px;
                      background-color: #181818;
                  }
                  .outer{
                      margin: 0;
                      width: 100%;
                      max-width: 600px;
                      border-spacing: 0;
                  }
                  .padding{
                      padding: 15px 30px;
                      color: #ffffff;
                  }
                  .mailbody{
                      color: #ffffff;
                      padding: 0 30px 15px;
                  }
                  .details{
                      color: #ffef00;
                  }
                  @media screen and (max-width: 600px){
      
                  }
                  @media screen and (max-width: 400px){

                  }
              </style>
          </head>
          <body>
              <center class="wrapper">
                  <div class="webkit">
                      <table class="outer" align="center">
                          <tr>
                              <td>
                                  <table width="100%" style="border-spacing: 0; border-bottom: 1px solid #ffef00">
                                      <tr>
                                          <td style="background-color: #181818; padding: 10px; text-align: center;">
                                              <a href="http://facturandote.com/"><img src="https://i.ibb.co/RjVTYdD/Facturandote-Logo.png" width="180px" alt="Facturándote" title="Facturándote"></a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="100%" style="border-spacing: 0; border-bottom: 1px solid #ffef00;">
                                      <tr>
                                          <td class="padding">
                                              <table align="center" class="details">
                                                  <tr>
                                                      <td><p style="font-size: 18px; font-weight: 500;">Gracias querer formar parte de nuestro equipo</p></td>
                                                  </tr>
                                                  <tr>
                                                      <td><p style="color: #ffffff; padding: 0 30px;">Estimado ${name}:</p></td>
                                                  </tr>
                                                  <tr>
                                                      <td><p class="mailbody">En breve un miembro de nuestro equipo se pondrá en contacto con usted para indicarle los pasos a seguir para convertirte en distribuidor de <span style="color: #ffef00">Facturándote</span>.
                                                      </p></td>
                                                  </tr>
                                                  <tr>
                                                      <td><p class="mailbody" style="text-align: right;">El Equipo de Soporte</p></td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="100%" style="border-spacing: 0; border-bottom: 1px solid #ffef00;">
                                      <tr>
                                          <td style="background-color: #181818; padding: 15px; text-align: center;">
                                          <p style="font-size: 18px; color: #ffef00; margin-bottom: 13px;">Conecta con nosotros</p>
                                              <a href="https://www.facebook.com/Facturandote.mx"><img src="https://i.ibb.co/jy49J6p/white-facebook.png" width="30px" alt="Facebook"></a>
                                              <a href="https://twitter.com/Facturandote_"><img src="https://i.ibb.co/Y2VR1pS/white-twitter.png" width="30px" alt="Twitter"></a>
                                              <a href="https://www.youtube.com/channel/UC7mwcwBS4ECDZBzOxx9xwQQ"><img src="https://i.ibb.co/QbLzTgf/white-youtube.png" width="30px" alt="Youtube"></a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="100%" style="background-color: #181818; border-spacing: 0; color: #ffffff; font-size: 14px;">
                                      <tr>
                                          <td style="padding: 20px; text-align: center;">
                                              <a href="http://facturandote.com/"><img src="https://i.ibb.co/RjVTYdD/Facturandote-Logo.png" width="150px" alt="Facturándote" title="Facturándote"></a>
                                              <p style="margin-top: 18px;">20 #277 Miguel Alemán, Mérida, Yucatán, 97148.</p>
                                              <p style="margin-top: 18px; color: #ffef00; text-decoration: none;">soporte@facturandote.com</p>
                                              <p style="margin-top: 18px; color: #ffef00;">+52 999-927-5000</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </div>
              </center>
          </body>
      </html>
      ` //html body
    });
    res.json({ message: "Mail saved" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

mailsController.uploadVoucher = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  try {
    let file = req.files.file;
    let uploadPath = path.join(__dirname, "../vouchers/" + file.name);
    file.mv(uploadPath);
    return res.json({ filename: file.name, uploadPath: uploadPath });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "error.message",
    });
  }
};

mailsController.sendDepositPaymentMail = async (req, res) => {
  try {
    validations.paymentInfoValidation(req.body);
    const {
      name,
      phone,
      rfc,
      email,
      reason,
      cfdi,
      price,
      product,
      filename,
      uploadPath,
    } = req.body;
    console.log(req.body);
    await transporter.sendMail({
      from: '"Facturándote" <soporte@facturandote.com>', // sender address
      to: `${email}, soporte@facturandote.com`, // list of receivers
      subject: "Comprobante", // Subject line
      text: "Su comprobante de pago fue enviado con éxito", // plain text body
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" >
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
              <style type="text/css">
                  body{
                      margin: 0;
                      padding: 0;
                      background-color: #f6f9fc;
                      font-family: 'Sora', sans-serif;
                  }
                  table{
                      border-spacing: 0;
                  }
                  td{
                      padding: 0;
                  }
                  img{
                      border: 0;
                  }
                  .wrapper{
                      width: 100%;
                      table-layout: fixed;
                      background-color: #f6f9fc;
                      padding-bottom: 40px;
                  }
                  .webkit{
                      max-width: 600px;
                      background-color: #181818;
                  }
                  .outer{
                      margin: 0;
                      width: 100%;
                      max-width: 600px;
                      border-spacing: 0;
                  }
                  .padding{
                      padding: 15px 30px;
                      color: #ffffff;
                  }
                  .details{
                      color: #ffef00;
                  }
                  @media screen and (max-width: 600px){
      
                  }
                  @media screen and (max-width: 400px){
                    
                  }
              </style>
          </head>
          <body>
              <center class="wrapper">
                  <div class="webkit">
                      <table class="outer" align="center">
                          <tr>
                              <td>
                                  <table width="100%" style="border-spacing: 0;">
                                      <tr>
                                          <td style="background-color: #181818; padding: 10px; text-align: center;">
                                              <a href="http://facturandote.com/"><img src="https://i.ibb.co/RjVTYdD/Facturandote-Logo.png" width="180px" alt="Facturándote" title="Facturándote"></a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <a href=""><img src="https://i.ibb.co/Y7BRdmq/paquetes-Basicos.jpg" width="100%" alt="Paquetes Básicos"></a>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="100%" style="border-spacing: 0; border-bottom: 1px solid #ffef00;">
                                      <tr>
                                          <td class="padding">
                                              <table align="center" class="details">
                                                  <tr>
                                                      <td><p style="font-size: 18px;"><b>Detalles de compra</b></p></td>
                                                  </tr>
                                                  <tr>
                                                      <table width="100%" class="padding">
                                                          <tr>
                                                              <td><p style="font-weight: 500;">Producto:</p></td>
                                                              <td style="text-align: right;"><p>${product}</p></td>
                                                          </tr>
                                                          <tr>
                                                              <td><p style="font-weight: 500;">Precio:</p></td>
                                                              <td style="text-align: right;"><p>${numeral(price).format("$0.00")}</p></td>
                                                          </tr>
                                                          <tr>
                                                              <td><p style="font-weight: 500;">Nombre:</p></td>
                                                              <td style="text-align: right;"><p>${name}</p></td>
                                                          </tr>
                                                          <tr>
                                                              <td><p style="font-weight: 500;">Email:</p></td>
                                                              <td style="text-align: right;"><p>${email}</p></td>
                                                          </tr>
                                                          <tr>
                                                              <td><p style="font-weight: 500;">Número:</p></td>
                                                              <td style="text-align: right;"><p>${phone}</p></td>
                                                          </tr>
                                                          <tr>
                                                              <td><p style="font-weight: 500;">Razón Social:</p></td>
                                                              <td style="text-align: right;"><p>${reason}</p></td>
                                                          </tr>
                                                          <tr>
                                                              <td><p style="font-weight: 500;">RFC:</p></td>
                                                              <td style="text-align: right;"><p>${rfc}</p></td>
                                                          </tr>
                                                          <tr>
                                                              <td><p style="font-weight: 500;">CFDI:</p></td>
                                                              <td style="text-align: right;"><p>${cfdi}</p></td>
                                                          </tr>
                                                      </table>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="100%" style="border-spacing: 0; border-bottom: 1px solid #ffef00;">
                                      <tr>
                                          <td style="background-color: #181818; padding: 15px; text-align: center;">
                                          <p style="font-size: 18px; color: #ffef00; margin-bottom: 13px;">Conecta con nosotros</p>
                                              <a href="https://www.facebook.com/Facturandote.mx"><img src="https://i.ibb.co/jy49J6p/white-facebook.png" width="30px" alt="Facebook"></a>
                                              <a href="https://twitter.com/Facturandote_"><img src="https://i.ibb.co/Y2VR1pS/white-twitter.png" width="30px" alt="Twitter"></a>
                                              <a href="https://www.youtube.com/channel/UC7mwcwBS4ECDZBzOxx9xwQQ"><img src="https://i.ibb.co/QbLzTgf/white-youtube.png" width="30px" alt="Youtube"></a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="100%" style="background-color: #181818; border-spacing: 0; color: #ffffff; font-size: 14px;">
                                      <tr>
                                          <td style="padding: 20px; text-align: center;">
                                          <a href="http://facturandote.com/"><img src="https://i.ibb.co/RjVTYdD/Facturandote-Logo.png" width="150px" alt="Facturándote" title="Facturándote"></a>
                                              <p style="margin-top: 18px;">20 #277 Miguel Alemán, Mérida, Yucatán, 97148.</p>
                                              <p style="margin-top: 18px; color: #ffef00; text-decoration: none;">soporte@facturandote.com</p>
                                              <p style="margin-top: 18px; color: #ffef00;">+52 999-927-5000</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </div>
              </center>
          </body>
      </html>
            `, // html body
      attachments: [
        {
          filename: filename,
          path: uploadPath,
        },
      ],
    });
    fs.unlinkSync(uploadPath);
    res.json({ message: "Mail sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "error.message",
    });
  }
};

mailsController.sendCardPaymentMail = async (req, res) => {
  try {
    validations.paymentInfoValidation(req.body);
    const { name, phone, rfc, email, reason, cfdi, price, product } = req.body;
    console.log(req.body);
    await transporter.sendMail({
      from: '"Facturándote" <soporte@facturandote.com>', // sender address
      to: `${email}, soporte@facturandote.com`, // list of receivers
      subject: "Comprobante", // Subject line
      text: "Su pago fue realizado con éxito", // plain text body
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" >
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
                <style type="text/css">
                    body{
                        margin: 0;
                        padding: 0;
                        background-color: #f6f9fc;
                        font-family: 'Sora', sans-serif;
                    }
                    table{
                        border-spacing: 0;
                    }
                    td{
                        padding: 0;
                    }
                    img{
                        border: 0;
                    }
                    .wrapper{
                        width: 100%;
                        table-layout: fixed;
                        background-color: #f6f9fc;
                        padding-bottom: 40px;
                    }
                    .webkit{
                        max-width: 600px;
                        background-color: #181818;
                    }
                    .outer{
                        margin: 0;
                        width: 100%;
                        max-width: 600px;
                        border-spacing: 0;
                    }
                    .padding{
                        padding: 15px 30px;
                        color: #ffffff;
                    }
                    .details{
                        color: #ffef00;
                    }
                    @media screen and (max-width: 600px){
        
                    }
                    @media screen and (max-width: 400px){
                      
                    }
                </style>
            </head>
            <body>
                <center class="wrapper">
                    <div class="webkit">
                        <table class="outer" align="center">
                            <tr>
                                <td>
                                    <table width="100%" style="border-spacing: 0;">
                                        <tr>
                                            <td style="background-color: #181818; padding: 10px; text-align: center;">
                                                <a href="http://facturandote.com/"><img src="https://i.ibb.co/RjVTYdD/Facturandote-Logo.png" width="180px" alt="Facturándote" title="Facturándote"></a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href=""><img src="https://i.ibb.co/Y7BRdmq/paquetes-Basicos.jpg" width="100%" alt="Paquetes Básicos"></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="100%" style="border-spacing: 0; border-bottom: 1px solid #ffef00;">
                                        <tr>
                                            <td class="padding">
                                                <table align="center" class="details">
                                                    <tr>
                                                        <td><p style="font-size: 18px;"><b>Detalles de compra</b></p></td>
                                                    </tr>
                                                    <tr>
                                                        <table width="100%" class="padding">
                                                            <tr>
                                                                <td><p style="font-weight: 500;">Producto:</p></td>
                                                                <td style="text-align: right;"><p>${product}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><p style="font-weight: 500;">Precio:</p></td>
                                                                <td style="text-align: right;"><p>${numeral(price).format("$0.00")}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><p style="font-weight: 500;">Nombre:</p></td>
                                                                <td style="text-align: right;"><p>${name}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><p style="font-weight: 500;">Email:</p></td>
                                                                <td style="text-align: right;"><p>${email}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><p style="font-weight: 500;">Número:</p></td>
                                                                <td style="text-align: right;"><p>${phone}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><p style="font-weight: 500;">Razón Social:</p></td>
                                                                <td style="text-align: right;"><p>${reason}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><p style="font-weight: 500;">RFC:</p></td>
                                                                <td style="text-align: right;"><p>${rfc}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><p style="font-weight: 500;">CFDI:</p></td>
                                                                <td style="text-align: right;"><p>${cfdi}</p></td>
                                                            </tr>
                                                        </table>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="100%" style="border-spacing: 0; border-bottom: 1px solid #ffef00;">
                                        <tr>
                                            <td style="background-color: #181818; padding: 15px; text-align: center;">
                                            <p style="font-size: 18px; color: #ffef00; margin-bottom: 13px;">Conecta con nosotros</p>
                                                <a href="https://www.facebook.com/Facturandote.mx"><img src="https://i.ibb.co/jy49J6p/white-facebook.png" width="30px" alt="Facebook"></a>
                                                <a href="https://twitter.com/Facturandote_"><img src="https://i.ibb.co/Y2VR1pS/white-twitter.png" width="30px" alt="Twitter"></a>
                                                <a href="https://www.youtube.com/channel/UC7mwcwBS4ECDZBzOxx9xwQQ"><img src="https://i.ibb.co/QbLzTgf/white-youtube.png" width="30px" alt="Youtube"></a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="100%" style="background-color: #181818; border-spacing: 0; color: #ffffff; font-size: 14px;">
                                        <tr>
                                            <td style="padding: 20px; text-align: center;">
                                            <a href="http://facturandote.com/"><img src="https://i.ibb.co/RjVTYdD/Facturandote-Logo.png" width="150px" alt="Facturándote" title="Facturándote"></a>
                                                <p style="margin-top: 18px;">20 #277 Miguel Alemán, Mérida, Yucatán, 97148.</p>
                                                <p style="margin-top: 18px; color: #ffef00; text-decoration: none;">soporte@facturandote.com</p>
                                                <p style="margin-top: 18px; color: #ffef00;">+52 999-927-5000</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </center>
            </body>
        </html>
            `, // html body
    });
    res.send({ message: "Sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "error.message",
    });
  }
};

module.exports = mailsController;
