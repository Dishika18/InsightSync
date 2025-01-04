document.addEventListener('DOMContentLoaded', function() {
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
  
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          alert('Login successful!');
          localStorage.setItem('authToken', data.token);
          window.location.href = '/InsightSync/';
        } else {
          alert('Login failed: ' + data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  }
  