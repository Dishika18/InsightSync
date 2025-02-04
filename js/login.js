document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
});

function handleLoginSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const formData = { email, password };

  fetch('https://insight-sync-u1bq.vercel.app/api/v1/auth/login', {
  // fetch('http://localhost:3000/api/v1/auth/login', {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        Toastify({
          text: 'Login successful!',
          duration: 3000, // Duration in milliseconds
          gravity: 'top', // Vertical position
          position: 'right', // Horizontal position
          backgroundColor: '#4caf50', // Green background for success
          stopOnFocus: true, // Stop timeout on hover
          className: 'toastify-custom', // Custom class for styling
        }).showToast();

        localStorage.setItem('authToken', data.token);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000); // Redirect after 3 seconds
      } else {
        Toastify({
          text: 'Login failed: ' + data.message,
          duration: 3000, // Duration in milliseconds
          gravity: 'top', // Vertical position
          position: 'right', // Horizontal position
          backgroundColor: '#ff4d4d', // Red background for error
          stopOnFocus: true, // Stop timeout on hover
          className: 'toastify-custom', // Custom class for styling
        }).showToast();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Toastify({
        text: 'An error occurred. Please try again later.',
        duration: 3000, // Duration in milliseconds
        gravity: 'top', // Vertical position
        position: 'right', // Horizontal position
        backgroundColor: '#ff4d4d', // Red background for error
        stopOnFocus: true, // Stop timeout on hover
        className: 'toastify-custom', // Custom class for styling
      }).showToast();
    });
}
