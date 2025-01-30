document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.custom-form.contact-form'); // Select the contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

function handleContactSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form field values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const formData = { name, email, subject, message };

    fetch('https://insight-sync-u1bq.vercel.app', { // Update the URL to match your backend route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                showNotification('Form submitted successfully: ' + data.message, 'success');
                document.querySelector('.custom-form.contact-form').reset(); 
            } else {
                showNotification('Failed to submit form: ' + (data.error || 'Unknown error'), 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Failed to submit form: An unexpected error occurred.', 'error');
        });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type === 'success' ? 'show' : 'error');
    notification.innerText = message;

    // Append the notification to the body
    document.body.appendChild(notification);

    // Add the show class after a delay to trigger the animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove the notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}
