import nodemailer from 'nodemailer';
import {EMAIL_PASSWORD} from '../config/env.js';

const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'maazin.vlogs@gmail.com',
        pass: EMAIL_PASSWORD
    }
});

export default transporter;