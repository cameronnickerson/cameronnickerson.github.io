// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Replace with your email details
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cameronnickerson97@gmail.com', // Your Gmail address
        pass: 'qeqp awnd prri bxjw'           // Your Gmail app password
    }
});

// Handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email, // The sender's email (form input)
        to: 'cameronnickerson97@gmail.com', // Your receiving email address
        subject: `Github Website Contact Message From ${name}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            // Send error response to client
            return res.status(500).json({ status: 'error', message: 'Email could not be sent. Please try again later.' });
        }
        // Send success response to client
        res.status(200).json({ status: 'success', message: 'Your message has been sent!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
