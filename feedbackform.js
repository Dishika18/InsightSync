var form_1 = document.querySelector(".form_1");
var form_2 = document.querySelector(".form_2");
var form_3 = document.querySelector(".form_3");

var form_1_btns = document.querySelector(".form_1_btns");
var form_2_btns = document.querySelector(".form_2_btns");
var form_3_btns = document.querySelector(".form_3_btns");

var form_1_next_btn = document.querySelector(".form_1_btns .btn_next");
var form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
var form_2_next_btn = document.querySelector(".form_2_btns .btn_next");
var form_3_back_btn = document.querySelector(".form_3_btns .btn_back");

var form_2_progressbar = document.querySelector(".form_2_progressbar");
var form_3_progressbar = document.querySelector(".form_3_progressbar");

var btn_done = document.querySelector(".btn_done");
var modal_wrapper = document.querySelector(".modal_wrapper");
var shadow = document.querySelector(".shadow");

function validateForm(form) {
    var inputs = form.querySelectorAll("input, textarea");
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].checkValidity()) {
            inputs[i].reportValidity();
            return false;
        }
    }
    return true;
}

form_1_next_btn.addEventListener("click", function() {
    if (validateForm(form_1)) {
        form_1.style.display = "none";
        form_2.style.display = "block";

        form_1_btns.style.display = "none";
        form_2_btns.style.display = "flex";

        form_2_progressbar.classList.add("active");
    }
});

form_2_back_btn.addEventListener("click", function() {
    form_1.style.display = "block";
    form_2.style.display = "none";

    form_1_btns.style.display = "flex";
    form_2_btns.style.display = "none";

    form_2_progressbar.classList.remove("active");
});

form_2_next_btn.addEventListener("click", function() {
    if (validateForm(form_2)) {
        form_2.style.display = "none";
        form_3.style.display = "block";

        form_2_btns.style.display = "none";
        form_3_btns.style.display = "flex";

        form_3_progressbar.classList.add("active");
    }
});

form_3_back_btn.addEventListener("click", function() {
    form_2.style.display = "block";
    form_3.style.display = "none";

    form_2_btns.style.display = "flex";
    form_3_btns.style.display = "none";

    form_3_progressbar.classList.remove("active");
});

btn_done.addEventListener("click", function() {
    if (validateForm(form_3)) {
        modal_wrapper.classList.add("active");
    }
});

shadow.addEventListener("click", function() {
    modal_wrapper.classList.remove("active");
});

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

// Check if the user is logged in by verifying the presence of an auth token in localStorage
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

console.log("modules")
    const logoutbtn = document.getElementById("signout")
    const loginbtn = document.getElementById("loginbtn")
    const signupbtn = document.getElementById("signupbtn")
    if (localStorage.getItem("authToken")) {
        console.log(signupbtn)
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