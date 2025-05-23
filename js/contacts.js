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

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('loginPassword');
    const togglePasswordIcon = document.getElementById('togglePasswordIcon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordIcon.classList.remove('bi-eye');
        togglePasswordIcon.classList.add('bi-eye-slash');
    } else {
        passwordInput.type = 'password';
        togglePasswordIcon.classList.remove('bi-eye-slash');
        togglePasswordIcon.classList.add('bi-eye');
    }
}

function validateForm() {
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    let valid = true;

    if (!email.value) {
        email.classList.add('is-invalid');
        valid = false;
    } else {
        email.classList.remove('is-invalid');
    }

    if (!password.value) {
        password.classList.add('is-invalid');
        valid = false;
    } else {
        password.classList.remove('is-invalid');
    }

    return valid;
}
function validateSignupForm() {
    const username = document.getElementById('signupUsername');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('signupConfirmPassword');
    let valid = true;

    // Username validation (must be at least 3 characters)
    if (username.value.length < 3) {
        username.classList.add('is-invalid');
        valid = false;
    } else {
        username.classList.remove('is-invalid');
    }

    // Email validation (checks format)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email.value)) {
        email.classList.add('is-invalid');
        valid = false;
    } else {
        email.classList.remove('is-invalid');
    }

    // Password validation (at least 6 characters and includes a number)
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (!passwordPattern.test(password.value)) {
        password.classList.add('is-invalid');
        valid = false;
    } else {
        password.classList.remove('is-invalid');
    }

    // Confirm password validation (must match the password)
    if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
        valid = false;
    } else {
        confirmPassword.classList.remove('is-invalid');
    }

    return valid;
}

function toggleSignupPasswordVisibility() {
    const passwordInput = document.getElementById('signupPassword');
    const togglePasswordIcon = document.getElementById('toggleSignupPasswordIcon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordIcon.classList.remove('bi-eye');
        togglePasswordIcon.classList.add('bi-eye-slash');
    } else {
        passwordInput.type = 'password';
        togglePasswordIcon.classList.remove('bi-eye-slash');
        togglePasswordIcon.classList.add('bi-eye');
    }
}

function toggleSignupConfirmPasswordVisibility() {
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');
    const toggleConfirmPasswordIcon = document.getElementById('toggleSignupConfirmPasswordIcon');
    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        toggleConfirmPasswordIcon.classList.remove('bi-eye');
        toggleConfirmPasswordIcon.classList.add('bi-eye-slash');
    } else {
        confirmPasswordInput.type = 'password';
        toggleConfirmPasswordIcon.classList.remove('bi-eye-slash');
        toggleConfirmPasswordIcon.classList.add('bi-eye');
    }
}

console.log("modules")
    const logoutbtn = document.getElementById("signout")
    const loginbtn = document.getElementById("loginbtn")
    const signupbtn = document.getElementById("signupbtn")
    if (localStorage.getItem("authToken")) {
        loginbtn.style.display = "none"
        signupbtn.style.display= "none"
    }else{
        
        logoutbtn.style.display = "none"
    }
    document.getElementById("logoutbtn2").addEventListener("click",()=>{
        console.log("clickedbskjkbvsdhvbskdmbvduksvbsdmhcbjh")
        localStorage.clear()
        window.location.href="/"
    })

    // // Check if the user is logged in by verifying the presence of an auth token in localStorage
        // if (localStorage.getItem("authToken")) {
        //     console.log("User logged in");
    
        //     // Select all elements with the class 'authcomp'
        //     const authElements = document.getElementsByClassName("authcomp");
    
        //     // Loop through the elements and change their opacity
        //     Array.from(authElements).forEach(element => {
        //         element.style.opacity = 0; // Set opacity to 0 (hidden)
        //         element.style.pointerEvents = "none"; // Prevent interaction
        //     });
        // } else {
        //     console.log("User not logged in");
        // }
        document.querySelector(
            ".copyright-text"
          ).textContent = `Copyright © ${new Date().getFullYear()} InsightSync. All rights reserved.`;