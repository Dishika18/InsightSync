const editbtn = document.getElementById("editbtn");
      editbtn.addEventListener(
        "click",
        () => (window.location.href = "/edit-profile.html")
      );

      import { link } from "./Baselink.js";
      const saveforlaterUrl = `${link}/api/v1/insight/getsaveforlater`

      async function fetchesaveforlater() {
        const reap = await axios.get(saveforlaterUrl,{
          headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json",
            },
        })
        console.log("saved",reap.data)
        displaySaveforlater(reap.data.savedTopics)
      }

      fetchesaveforlater()

      function displaySaveforlater(insights){
        const insightsContainer = document.getElementById("saveforlatercont");
        insightsContainer.innerHTML = `<h2>User Saved Insights</h2>`;

        if (!insights || insights.length === 0) {
          insightsContainer.innerHTML += `<p>No insights found.</p>`;
          return;
        }

        insights.forEach((insight) => {
          const insightCard = document.createElement("div");
          insightCard.className = "insight-card";
          insightCard.innerHTML = `
                    <h3>${insight.title}</h3>
                    <p><strong>Topic:</strong> ${insight.topic}</p>
                    <p>${insight.content}</p>
                    ${
                      insight.Image
                        ? `<img src="${insight.Image}" alt="${insight.title}">`
                        : ""
                    }
                `;
          insightsContainer.appendChild(insightCard);
        });
      }
      import { link } from "./Baselink.js";
      console.log(localStorage);

      async function fetchProfile() {
        const profileUrl = `${link}/api/v1/profile/getprofile`;
        const insightsUrl = `${link}/api/v1/insight/getinsightbyuser`;
        const authToken = localStorage.getItem("authToken");

        // Check if authToken exists, if not, show specific notification and redirect
        if (!authToken) {
          showNotification(
            "You need to log in to access this page. Redirecting..."
          );
          setTimeout(() => {
            window.location.href = "/index.html";
          }, 5000);
          return; // Stop further execution
        }

        try {
          // Fetch profile details
          const profileResponse = await axios.get(profileUrl, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          });
          displayProfile(profileResponse.data.user);

          // Fetch insights
          const insightsResponse = await axios.get(insightsUrl, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          });
          displayInsights(insightsResponse.data.insights);
        } catch (error) {
          // Handle specific errors
          if (error.response && error.response.status === 401) {
            showNotification("Unauthorized access. Please log in.");
            setTimeout(() => {
              window.location.href = "/index.html";
            }, 5000);
          }
        }
      }


      function displayProfile(user) {
        console.log(user)
        const profileInfoDiv = document.getElementById("profile-info");
        const formattedCreatedOn = user.createdOn
          ? new Date(user.createdOn).toLocaleDateString()
          : "N/A";
        console.log(user);
        profileInfoDiv.innerHTML = `
                <div class="profile-image" >
                    <img src=${user.image} alt="profile image">
                </div>
                <p class="profile-item"><span>Username:</span> ${user.username}</p>
                <p class="profile-item"><span>Email:</span> ${user.email}</p>
                <p class="profile-item"><span>Insights Count:</span> ${user.inSightsCount}</p>
                <p class="profile-item"><span>Account Created On:</span> ${formattedCreatedOn}</p>
            `;
      }

      function displayInsights(insights) {
        const insightsContainer = document.getElementById("insights-container");
        insightsContainer.innerHTML = `<h2>User Insights</h2>`;

        if (!insights || insights.length === 0) {
          insightsContainer.innerHTML += `<p>No insights found.</p>`;
          return;
        }

        insights.forEach((insight) => {
          const insightCard = document.createElement("div");
          insightCard.className = "insight-card";
          insightCard.innerHTML = `
                    <h3>${insight.title}</h3>
                    <p><strong>Topic:</strong> ${insight.topic}</p>
                    <p>${insight.content}</p>
                    ${
                      insight.Image
                        ? `<img src="${insight.Image}" alt="${insight.title}">`
                        : ""
                    }
                `;
          insightsContainer.appendChild(insightCard);
        });
      }

      function showNotification(message) {
        const notification = document.getElementById("notification");
        const notificationMessage = document.getElementById(
          "notification-message"
        );

        notificationMessage.textContent = message;
        notification.style.display = "block";

        // Automatically hide and redirect after 5 seconds
        setTimeout(() => {
          notification.style.display = "none";
        }, 5000);
      }



      window.onload = fetchProfile;