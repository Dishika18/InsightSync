document.addEventListener('DOMContentLoaded', function() {
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
    alert('Passwords do not match');
    return;
  }

  const formData = { username, email, password };

  fetch('http://localhost:3000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        alert('Signup successful! You are now logged in.');
        localStorage.setItem('authToken', data.token);
        window.location.href = '/';
      } else {
        alert('Signup failed: ' + data.message);
      }
    })
    .catch(error => console.error('Error:', error));
}
