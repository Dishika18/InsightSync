document.addEventListener('DOMContentLoaded', function() {
    // console.log('DOMContentLoaded fired'); 
    document.getElementById('loginForm').addEventListener('submit', handleSubmit);
});

function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Log the values to ensure they are correctly captured
    // console.log('Email:', email);
    // console.log('Password:', password);

    // Create the data object to send to the server
    const formData = {
        email: email,
        password: password,
    };

    // Log the formData object to ensure it's correct
    // console.log('Form Data:', formData);

    // Send a POST request to the server
    fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        // Log the server response
        // console.log('Response from server:', data);

        if (data.token) {
            // Handle successful login (token is present)
            alert('Login successful!');
            // Optionally store the token (e.g., in localStorage) and redirect
            localStorage.setItem('authToken', data.token);
            window.location.href = '/'; // Redirect to index page
        } else {
            // Handle errors (e.g., show error messages)
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
