const nodemailer = require('nodemailer');

const sendMessage = (reviever, text) => {
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

    const message = {
        from: process.env.MAIL_FROM,
        to: reviever,
        subject: 'Amazon-Price-Tracker',
        text,
    };
    transporter.sendMail(message);
};

module.exports = {
    sendMessage,
};
