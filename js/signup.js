document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('signupForm').addEventListener('submit', handleSubmit);
});

function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  // Basic validation example
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Create the data object to send to the server
  const formData = {
    username: username,
    email: email,
    password: password,
  };

  // Send a POST request to the server
  fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Response from server:', data);
    if (data.token) {
      // If token is received, consider it as successful signup
      alert('Signup successful! You are now logged in.');

      // Optionally, store the token for authenticated requests
      localStorage.setItem('authToken', data.token);

      // Redirect to the home page after signup
      window.location.href = '/'; // Redirect to home page
    } else {
      // Handle errors (e.g., show error messages)
      alert('Signup failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

