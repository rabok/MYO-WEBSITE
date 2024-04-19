require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Mailchimp = require('mailchimp-api-v3');
const appRoute = require('./routes/route.js');

const app = express();
const PORT = process.env.PORT || 5000;

const mailchimp = new Mailchimp({
    apiKey: process.env.MAILCHIMP_API_KEY
});

// Middleware setup
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', appRoute);

// Subscription route
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    
    // Add subscriber to Mailchimp audience list
    mailchimp.post(`/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`, {
        email_address: email,
        status: 'subscribed'
    })
    .then(() => {
        console.log('Subscription successful');
        res.status(200).send('Thank you for subscribing!');
    })
    .catch((err) => {
        console.error('Error subscribing to Mailchimp:', err);
        res.status(500).send('Error subscribing to newsletter');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
