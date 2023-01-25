import nodemailer from 'nodemailer';

const { AUTH_MAIL_USER, AUTH_MAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 587,
    secure: false,
    auth: {
        user: AUTH_MAIL_USER,
        pass: AUTH_MAIL_PASS,
    }
});

export default transporter;
