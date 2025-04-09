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

import { link } from "./Baselink.js";
    
        const params4 = new URLSearchParams(window.location.search);
        const id4 = params4.get('id');
        // console.log("forsave for later", id4);
    
        const savebtn1 = document.getElementById("savebtn");
        // console.log("savebtn element:", savebtn1);
    
        if (!savebtn1) {
            console.error("Button with id 'savebtn' not found");
        }
    
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("Auth token not found");
        } else {
            axios.get(`${link}/api/v1/insight/getsaveforlater`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((resp) => {
                // console.log("fetch save", resp.data.savedTopics);
                if (resp.data.savedTopics.some(el => el._id === id4)) {
                    // console.log("included");
                    savebtn1.innerHTML = "Saved";
                } else {
                    // console.log("not included");
                    savebtn1.innerText = "Save For Later";
                }
            })
            .catch((err) => {
                console.error("API error:", err);
            });
        }

        import { link } from "./Baselink.js"
        const params3 = new URLSearchParams(window.location.search);
        const id3 = params.get('id');
        const savebtn = document.getElementById("savebtn")
        savebtn.addEventListener("click",()=>{
            // console.log("clickeed")
            axios.post(`${link}/api/v1/insight/saveforlater`,{t_id:id3},{
                headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json",
              },
            })
            .then((data)=>{
                // console.log(data.data)
                if (data.data.updationStatus) {
                    savebtn.innerText="Saved"
                }else{
                    savebtn.innerText="Save For Later"
                }
            })
            .catch((err)=>{console.error(err)})
        })

        import { link } from "./Baselink.js"
        // const username = "exampleUser"; // Replace this with the actual username
        const profileLink = document.getElementById("profilelink");
        console.log(profileLink)


        // console.log(link)
        const usernamecont = document.getElementById("username")
        const userimg = document.getElementById("userimg")
        window.onload = async () => {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            // console.log("Insight ID:", id);

            // Fetch data for the specific ID or perform any other logic
            axios.post(`${link}/api/v1/insight/getinsightbyid`, {
                id
            })
                .then(({ data }) => {
                    console.log(data);

                    // Set image source
                    const img = document.getElementById("topic-image-id");
                    if (img) {
                        img.src = data.data.Image;
                    }

                    // Set heading text
                    const headings = document.querySelectorAll(".topic-header");
                    console.log(headings)
                    headings.forEach(heading => {
                        heading.innerHTML = data.data.title
                    });

                    // Set topic content
                    const contentClass = document.getElementById("topic-content")
                    contentClass.innerHTML = data.data.content

                    if (data.data.likedBy.includes(localStorage.getItem('userid'))) {
                        console.log("user liked")
                        likeIcon.classList.remove("far");
                        likeIcon.classList.add("fas", "liked");
                    }

                    userimg.innerText = data.data.submittedby.username
                    userimg.src = data.data.submittedby.image
                    profileLink.href = `./puplicprofile.html?username=${data.data.submittedby._id}`;

                })
                .catch((err) => {
                    console.error("Error fetching insight data:", err);
                });
        };

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

          const editbtn = document.getElementById("editbtn")
          const params = new URLSearchParams(window.location.search);
          // console.log(params.get('id'))
          editbtn.addEventListener("click",()=>{
              window.location.href=`edit-insight.html?id=${params.get('id')}`
          })

          import { link } from "./Baselink.js"
        const params2 = new URLSearchParams(window.location.search);
    const id = params2.get('id');
    
    const likeBtn = document.getElementById("likebtn");
    const likeIcon = document.getElementById("likeIcon");
    let isLiked = false;
    
    
    
    likeBtn.addEventListener("click", () => {
    axios.post(`${link}/api/v1/insight/like/${id}`, {}, { // Empty object for request body
        headers: {
            'authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then((resp) => {
        // console.log(resp.data);
        if (resp.data.liked) {
            likeIcon.classList.remove("far");
            likeIcon.classList.add("fas", "liked");
        }else{
            likeIcon.classList.remove("fas", "liked");
            likeIcon.classList.add("far");
        }
    })
    .catch((error) => {
        console.error("Error liking the insight:", error);
    });
});

 // console.log("modules")
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
     // console.log("clickedbskjkbvsdhvbskdmbvduksvbsdmhcbjh")
     localStorage.clear()
     window.location.href="/"
 })