const nodemailer = require('nodemailer');

const sendVerificationMessage = (username, reviever, token) => {
    const transporter = nodemailer.createTransport({
        pool: true,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true, // use TLS
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const link = process.env.URL + '/auth/emailValidation/' + token;

    const message = {
        from: process.env.MAIL_FROM,
        to: reviever,
        subject: 'Amazon-Price-Tracker',
        text: ``,
    };
    transporter.sendMail(message);
};

module.exports = {
    sendVerificationMessage,
};
