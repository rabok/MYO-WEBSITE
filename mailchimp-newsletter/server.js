const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Allow CORS (for simplicity, in production, you should configure this more securely)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
    const { email, firstName, lastName, city, country, phone, opportunity } = req.body;

    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'info@maishayangu.org',
            pass: 'Handbrake.riding.praying.upright.shamba'
        }
    });

    // Setup email data
    let mailOptions = {
        from: '"Maisha Yangu" <info@maishayangu.org>',
        to: 'info@maishayangu.org',
        subject: 'New Contact Request',
        text: `
            New contact request:
            Name: ${firstName} ${lastName}
            Email: ${email}
            City: ${city}
            Country: ${country}
            Phone: ${phone}
            Opportunity: ${opportunity}
        `,
    };

    // Send email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ error: 'Failed to send email' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
