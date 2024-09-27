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

// Gmail credentials (prefer environment variables, fallback to hardcoded values)
const GMAIL_USER = process.env.GMAIL_USER || 'cameronnickerson97@gmail.com'; // Your Gmail address
const GMAIL_PASS = process.env.GMAIL_PASS || 'qeqp awnd prri bxjw'; // Your Gmail App Password (replace this if hardcoding)

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Use 465 for SSL
    secure: true, // Use true for port 465 (SSL)
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    },
    logger: true, // Enable logging for debugging
    debug: true // Include SMTP traffic in the logs
});

// Validate SMTP configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error('SMTP configuration error:', error); // Log detailed SMTP connection error
    } else {
        console.log('SMTP Server is ready to take messages');
    }
});

// Handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ status: 'error', message: 'All fields are required.' });
    }

    // Define email options
    const mailOptions = {
        from: `"${name}" <${email}>`, // Properly format sender name and email
        to: GMAIL_USER, // Your email address to receive the message
        subject: `Github Website Contact Message from ${name}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    // Send email using transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); // Log detailed SMTP error
            return res.status(500).json({ status: 'error', message: `Email could not be sent: ${error.message}` });
        }
        console.log('Email sent successfully:', info.response);
        res.status(200).json({ status: 'success', message: 'Your message has been sent!' });
    });
});

// Serve static files
app.use(express.static(__dirname));

// Serve index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
