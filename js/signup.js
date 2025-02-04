document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignupSubmit);
  }
});

function handleSignupSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  if (password !== confirmPassword) {
    Toastify({
      text: 'Passwords do not match',
      duration: 3000, // Duration in milliseconds
      gravity: 'top', // Vertical position
      position: 'right', // Horizontal position
      backgroundColor: '#ff4d4d', // Red background for error
      stopOnFocus: true, // Stop timeout on hover
      className: 'toastify-custom', // Custom class for styling
    }).showToast();
    return;
  }

  const formData = { username, email, password };

  fetch('https://insight-sync-u1bq.vercel.app/api/v1/auth/signup', {
    // fetch('http://localhost:3000/api/v1/auth/signup', {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        Toastify({
          text: 'Signup successful! You are now logged in.',
          duration: 3000,
          gravity: 'top',
          position: 'right',
          backgroundColor: '#4caf50', // Green background for success
          stopOnFocus: true,
          className: 'toastify-custom',
        }).showToast();

        localStorage.setItem('authToken', data.token);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000); // Redirect after 3 seconds
      } else {
        Toastify({
          text: 'Signup failed: ' + data.message,
          duration: 3000,
          gravity: 'top',
          position: 'right',
          backgroundColor: '#ff4d4d', // Red background for error
          stopOnFocus: true,
          className: 'toastify-custom',
        }).showToast();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Toastify({
        text: 'An error occurred. Please try again later.',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#ff4d4d', // Red background for error
        stopOnFocus: true,
        className: 'toastify-custom',
      }).showToast();
    });
}
