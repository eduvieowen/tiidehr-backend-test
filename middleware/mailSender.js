const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = (from, to, subject, content, htmlContent) => {
    let mailSender = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'eduvieouu@gmail.com',
            pass : 'kunbbsshczithjqs'
        }
    })

    mailSender.sendMail({
        from : from,
        to : to,
        subject : subject,
        text : content,
        html : htmlContent
    })
}

module.exports = sendMail;