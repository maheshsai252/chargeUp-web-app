const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'maheshsai252@gmail.com',
        pass: 'dgancgjrnksxwmxw',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

exports.sendEmail = (from,to,subject,content) => {
    const mailData = {
        from: from,
        to: to,
        subject: subject,
        text: content,
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        // res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
}