var nodemailer = require('nodemailer');

module.exports = {
    sendMail: function (receiver, subject, body) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'foodcourtvirtual@gmail.com',
                pass: 'Foodcourt123'
            }
        });

        var mailOptions = {
            from: 'foodcourtvirtual@gmail.com',
            to: receiver,
            subject: subject,
            html: body
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}