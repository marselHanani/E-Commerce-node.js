// sendEmail.service.js
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.API_KEY);
const sendEmail = async (to, subject, text) => {
    const msg = {
        to,
        from: 'marselhanani1@gmail.com',
        subject,
        text,
    };

    try {
       await sgMail.send(msg);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', JSON.stringify(error));
        throw new Error(`Email sending failed: ${JSON.stringify(error)}`);
    }
};

module.exports = sendEmail;
