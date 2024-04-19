const Mailchimp = require('mailchimp-api-v3');

require('dotenv').config();

const mailchimp = new Mailchimp({
    apiKey: process.env.MAILCHIMP_API_KEY // Use environment variable for API key
});

/** Handle subscription requests */
const subscribe = (req, res) => {
    const { email } = req.body;
    
    // Add subscriber to Mailchimp audience list
    mailchimp.post(`/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`, {
        email_address: email,
        status: 'subscribed'
    })
    .then(() => {
        console.log('Subscription successful');
        res.status(200).json({ message: 'Thank you for subscribing!' });
    })
    .catch((err) => {
        console.error('Error subscribing to Mailchimp:', err);
        res.status(500).json({ error: 'Error subscribing to newsletter' });
    });
}

module.exports = {
    subscribe
};
