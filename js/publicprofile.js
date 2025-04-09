import { link } from "./Baselink.js";
    
      async function fetchPublicProfile() {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get("username");
        if (!username) {
          showNotification("Username not provided in URL.");
          return;
        }
    
        const publicProfileUrl = `${link}/api/v1/profile/getpublicprofile/${username}`;
    
        try {
          const response = await fetch(publicProfileUrl, {
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          displayProfile(data);
        } catch (error) {
          showNotification("Error fetching profile.");
          console.error(error);
        }
      }
    
      function displayProfile(user) {
        const profileInfoDiv = document.getElementById("profile-info");
        profileInfoDiv.innerHTML = `
          <div class="profile-container">
            <div class="profile-image">
              <img src="${user.image}" alt="Profile image">
            </div>
            <p class="profile-item"><span>Username:</span> ${user.username}</p>
            <p class="profile-item"><span>Insights Count:</span> ${user.inSightsCount}</p>
          </div>
        `;
      }
    
      function showNotification(message) {
        const notification = document.getElementById("notification");
        notification.textContent = message;
        notification.style.display = "block";
        setTimeout(() => {
          notification.style.display = "none";
        }, 5000);
      }
    
      window.onload = fetchPublicProfile;
      
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