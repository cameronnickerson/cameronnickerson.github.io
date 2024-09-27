// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Replace with your email details
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Use 465 for SSL, or 587 for TLS
    secure: true, // Use true for port 465 (SSL)
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
            console.error('Error sending email:', error); // Log the full error stack for debugging
            return res.status(500).json({ status: 'error', message: `Email could not be sent. Error: ${error.message}` });
        }
        console.log('Email sent successfully:', info.response);
        res.status(200).json({ status: 'success', message: 'Your message has been sent!' });
    });
});

// Serve static assets (like styles.css and scripts.js) from the root directory
app.use(express.static(__dirname));

// Serve index.html directly from the root of the project
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
