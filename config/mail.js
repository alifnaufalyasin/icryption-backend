const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config()
const { MAIL_PASS } = process.env

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'kliniktongfang17@gmail.com',
    pass: MAIL_PASS
  }
}));


function sendMail(receiver,nama) {
  for(let i = 0; i<receiver.length; i++) {
    const mailOptions = {
      from: `"Icyption" <pengirim@gmail.com>`,
      to: receiver[i],
      subject: 'Pendafaran Icyption 2020',
      text: `Haloo ${nama[i]} ...

Selamat, registrasi anda telah berhasil.
`
    };
 
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {  
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

module.exports = {
  sendMail
}