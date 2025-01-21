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

    fetch('http://localhost:3000/api/v1/contact', { // Update the URL to match your backend route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Form submitted successfully: ' + data.message);
                document.querySelector('.custom-form.contact-form').reset(); 
            } else {
                alert('Failed to submit form: ' + (data.error || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit form: An unexpected error occurred.');
        });
}
