import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});


class Mail {
    constructor() {
        this.mailOptions = {
            from: {
                address: process.env.EMAIL,
                name: "Gaurav"
            }
        }
    }

    setCompanyName(name) {
        this.mailOptions.from.name = name;
    }

    setSenderEmail(email) {
        this.mailOptions.from.address = email;
    }

    setHtml(html) {
        this.mailOptions.html = html;
    }

    setTo(receiver) {
        this.mailOptions.to = receiver;
    }

    setSubject(subject) {
        this.mailOptions.subject = subject;
    }

    setText(text) {
        this.mailOptions.text = text;
    }

    async sendVerificationEmail(token, email) {
        const verifyLink = `${process.env.BACKEND_URL}/api/v1/players/verify_email?token=${token}`;

        await transporter.sendMail({
            from: {
                address: process.env.EMAIL,
                name: "Gaurav"
            },
            to: email,
            subject: 'Verify your email',
            html: `
                <h3>Email Verification</h3>
                <p>Click the link below to verify your email:</p>
                <a href="${verifyLink}">Verify Email</a>
            `
        })
    }
}

export default new Mail();
