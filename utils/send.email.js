import { emailTemplates } from "./email.template.js";
import dayjs from "dayjs";
import transporter from "../config/nodemailer.js";

export const sendReminderEmail = async ({to, type, subscription }) => {
    if (!to || !type) {
        throw new Error('Missing to or type');
    }
    
    const template = emailTemplates.find((template) => template.type === type);
    
    if (!template) {
        throw new Error('Invalid email type');
    }

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.RenewalDate).format('YYYY-MM-DD'),
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    };

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: 'maazin.vlogs@gmail.com',
        to: to,
        subject: subject,
        html: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error, 'Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}