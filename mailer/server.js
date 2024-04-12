const express = require('express');
const cors = require('cors');
const appRoute = require('./routes/route.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Add this line to enable CORS for all routes

/** routes */
app.use('/api', appRoute);

// Route to handle subscription requests
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    // Here you can add your logic to handle the subscription
    console.log('Received subscription request for email:', email);
    // For now, let's just send a simple response
    res.status(200).send('Subscription successful');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
