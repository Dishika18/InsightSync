function togglePasswordVisibility() {
    const passwordInput = document.getElementById("loginPassword");
    const togglePasswordIcon =
      document.getElementById("togglePasswordIcon");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePasswordIcon.classList.remove("bi-eye");
      togglePasswordIcon.classList.add("bi-eye-slash");
    } else {
      passwordInput.type = "password";
      togglePasswordIcon.classList.remove("bi-eye-slash");
      togglePasswordIcon.classList.add("bi-eye");
    }
  }

  function validateForm() {
    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");
    let valid = true;

    if (!email.value) {
      email.classList.add("is-invalid");
      valid = false;
    } else {
      email.classList.remove("is-invalid");
    }

    if (!password.value) {
      password.classList.add("is-invalid");
      valid = false;
    } else {
      password.classList.remove("is-invalid");
    }

    return valid;
  }
  function validateSignupForm() {
    const username = document.getElementById("signupUsername");
    const email = document.getElementById("signupEmail");
    const password = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById(
      "signupConfirmPassword"
    );
    let valid = true;

    // Username validation (must be at least 3 characters)
    if (username.value.length < 3) {
      username.classList.add("is-invalid");
      valid = false;
    } else {
      username.classList.remove("is-invalid");
    }

    // Email validation (checks format)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email.value)) {
      email.classList.add("is-invalid");
      valid = false;
    } else {
      email.classList.remove("is-invalid");
    }

    // Password validation (at least 6 characters and includes a number)
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (!passwordPattern.test(password.value)) {
      password.classList.add("is-invalid");
      valid = false;
    } else {
      password.classList.remove("is-invalid");
    }

    // Confirm password validation (must match the password)
    if (password.value !== confirmPassword.value) {
      confirmPassword.classList.add("is-invalid");
      valid = false;
    } else {
      confirmPassword.classList.remove("is-invalid");
    }

    return valid;
  }

  function toggleSignupPasswordVisibility() {
    const passwordInput = document.getElementById("signupPassword");
    const togglePasswordIcon = document.getElementById(
      "toggleSignupPasswordIcon"
    );
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePasswordIcon.classList.remove("bi-eye");
      togglePasswordIcon.classList.add("bi-eye-slash");
    } else {
      passwordInput.type = "password";
      togglePasswordIcon.classList.remove("bi-eye-slash");
      togglePasswordIcon.classList.add("bi-eye");
    }
  }

  function toggleSignupConfirmPasswordVisibility() {
    const confirmPasswordInput = document.getElementById(
      "signupConfirmPassword"
    );
    const toggleConfirmPasswordIcon = document.getElementById(
      "toggleSignupConfirmPasswordIcon"
    );
    if (confirmPasswordInput.type === "password") {
      confirmPasswordInput.type = "text";
      toggleConfirmPasswordIcon.classList.remove("bi-eye");
      toggleConfirmPasswordIcon.classList.add("bi-eye-slash");
    } else {
      confirmPasswordInput.type = "password";
      toggleConfirmPasswordIcon.classList.remove("bi-eye-slash");
      toggleConfirmPasswordIcon.classList.add("bi-eye");
    }
  }

  import { link } from "./Baselink.js";

    window.onload = async () => {
      /*
      <div class="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
        <div class="custom-block bg-white shadow-lg">
            <a class="designlink" href="topics-detail.html">
                <div class="d-flex">
                    <div>
                        <h5 class="mb-2 designHeading">Web Design</h5>

                        <p class="mb-0 designPara"> Web design involves creating visually appealing, user-friendly, and responsive websites by combining layout, typography, colors, and functionality to enhance user experience and effectively communicate the site's purpose.
                        </p>
                    </div>

                    <span class="badge bg-design rounded-pill ms-auto">14</span>
                </div>

                <img src="images/topics/undraw_Remote_design_team_re_urdx.png"
                    class="custom-block-image img-fluid designimage" alt="">
            </a>
        </div>
    </div>
      */
      axios
        .get(`${link}/api/v1/insight/getallinsight`)
        .then((resp) => {
          console.log(resp.data.data);
          // const parent = document.getElementById("parentCont");
          const parent = document.getElementById("parentCont");
          parent.classList.add('row','flex-wrap')
            
            resp.data.data.forEach((item) => {
                const colDiv = document.createElement("div");
                colDiv.classList.add("col-lg-4", "col-md-6", "col-12", "mb-4","smh");
                colDiv.id = item.updatedAt;
                
                const customBlock = document.createElement("div");
                customBlock.classList.add("custom-block", "bg-white", "shadow-lg");
                
                const linkElement = document.createElement("a");
                linkElement.classList.add("designlink");
                linkElement.href = `topics-detail.html?id=${item._id}`;
                
                const flexDiv = document.createElement("div");
                flexDiv.classList.add("d-flex");
                
                const textDiv = document.createElement("div");
                
                const heading = document.createElement("h5");
                heading.classList.add("mb-2", "designHeading");
                heading.textContent = item.title;
                
                const paragraph = document.createElement("p");
                paragraph.classList.add("mb-0", "designPara");
                paragraph.textContent = item.content;
                
                textDiv.appendChild(heading);
                textDiv.appendChild(paragraph);

                const badge = document.createElement("span");
                badge.classList.add("badge", "bg-design");
                badge.textContent = item.topic;

                const like = document.createElement("span");
                like.classList.add("badge", "bg-design");
                like.textContent = item.likes;
                colDiv.setAttribute("data-liked", item.likes);
                
                const topicLikeDiv = document.createElement("div");
                topicLikeDiv.style.display = "flex";
                topicLikeDiv.style.justifyContent = "space-between";
                topicLikeDiv.classList.add("ms-auto");
                topicLikeDiv.appendChild(badge);
                topicLikeDiv.appendChild(like);

                flexDiv.appendChild(textDiv);
                // flexDiv.appendChild(badge);
                
                const image = document.createElement("img");
                image.classList.add("custom-block-image", "img-fluid", "designimage");
                image.src = item.Image || "default-image.png";
                image.alt = item.title;
                
                linkElement.appendChild(image);
                linkElement.appendChild(flexDiv);
                linkElement.appendChild(topicLikeDiv);
                
                customBlock.appendChild(linkElement);
                colDiv.appendChild(customBlock);
                
                parent.appendChild(colDiv);
          });
        })
        .catch((err) => console.log(err));
    };

    const searchbtn = document.getElementById("searchbutton");
    const searchinput = document.getElementById("searchinput");

    searchbtn.addEventListener("click", () => {
      const elements = document.getElementsByClassName("smh");
      const searchtext = searchinput.value.toLowerCase().trim(); // Normalize the search text for case-insensitive comparison

      Array.from(elements).forEach((element) => {
        const cardText = element.textContent.toLowerCase(); // Normalize card content for comparison
        if (cardText.includes(searchtext)) {
          element.style.display = "block"; // Show matching cards
        } else {
          element.style.display = "none"; // Hide non-matching cards
        }
      });
    });

    const sortbtn = document.getElementById("sortbtn");

    sortbtn.addEventListener("change", () => {
      const sortOrder = sortbtn.value; // Get selected sort option
      const parent = document.getElementById("parentCont");
      const cards = Array.from(parent.getElementsByClassName("smh")); // Get all card elements
      
      // Sort the cards array based on the 'id' attribute (createdAt)
      cards.sort((a, b) => {
        if (sortOrder === "new" || sortOrder === "old") {
          const dateA = new Date(a.id || 0); // Convert id to Date object, handle empty id
          const dateB = new Date(b.id || 0);
          
          if (sortOrder === "new") {
            return dateB - dateA; // Recent first
          } else if (sortOrder === "old") {
            return dateA - dateB; // Oldest first
          }
        } else if (sortOrder === "liked") {
          const likeA = a.dataset.liked;
          const likeB = b.dataset.liked;

          return likeB - likeA;
        }
      });
      console.log(cards)

      // Append the sorted cards back to the parent container
      cards.forEach((card) => parent.appendChild(card));
    });

    // // Check if the user is logged in by verifying the presence of an auth token in localStorage
    // if (localStorage.getItem("authToken")) {
    //   console.log("User logged in");

    //   // Select all elements with the class 'authcomp'
    //   const authElements = document.getElementsByClassName("authcomp");

    //   // Loop through the elements and change their opacity
    //   Array.from(authElements).forEach((element) => {
    //     element.style.opacity = 0; // Set opacity to 0 (hidden)
    //     element.style.pointerEvents = "none"; // Prevent interaction
    //   });
    // } else {
    //   console.log("User not logged in");
    // }
    document.querySelector(
        ".copyright-text"
      ).textContent = `Copyright © ${new Date().getFullYear()} InsightSync. All rights reserved.`;

      const sortbytopicbtn = document.getElementById("sortbytopicbtn")

      sortbytopicbtn.addEventListener("change", (e) => {
        const parentsortingElement =document.getElementsByClassName("smh");
        console.log(parentsortingElement)
        Array.from(parentsortingElement).forEach((elem)=>{
          elem.style.display="flex"
          console.log(elem.lastChild.lastChild.lastChild.innerText)
          console.log(e.target.value)
          // if (elem.lastChild.innerText !== e.target.value) {
          //   console.log("element is",elem)
          //   elem.style.display ="none"
          //   // element.style.pointerEvents = "none"; // Prevent interaction
          // }
          if (elem.lastChild.lastChild.lastChild.innerText != e.target.value) {
            elem.style.display="none"
          }
        })
        console.log(e.target.value)
      })

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