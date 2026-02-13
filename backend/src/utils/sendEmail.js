const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
        port: process.env.SMTP_PORT || 2525,
        auth: {
            user: process.env.SMTP_EMAIL || 'test',
            pass: process.env.SMTP_PASSWORD || 'test',
        },
    });

    const message = {
        from: `${process.env.FROM_NAME || 'L\'Oriental Travel'} <${process.env.FROM_EMAIL || 'noreply@loriental.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
