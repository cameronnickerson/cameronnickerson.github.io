// scripts.js
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Reference to feedback div for user messages
    const feedbackDiv = document.getElementById('form-feedback');

    // Clear any previous messages
    feedbackDiv.textContent = '';

    fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Display success message
            feedbackDiv.textContent = data.message;
            feedbackDiv.style.color = 'green';
            feedbackDiv.style.display = 'block';

            // Optionally, clear the form
            document.getElementById('contactForm').reset();
        } else {
            // Display error message
            feedbackDiv.textContent = 'There was an error sending your message. Please try again.';
            feedbackDiv.style.color = 'red';
            feedbackDiv.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Display error message
        feedbackDiv.textContent = 'There was an error sending your message. Please try again.';
        feedbackDiv.style.color = 'red';
        feedbackDiv.style.display = 'block';
    });
});
