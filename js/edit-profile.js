import { link } from "./Baselink.js";

        // Function to show notification
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.classList.add('notification');
            notification.textContent = message;

            if (type === 'success') {
                notification.style.backgroundColor = '#4CAF50'; // Green for success
            } else if (type === 'error') {
                notification.style.backgroundColor = '#f44336'; // Red for error
            } else {
                notification.style.backgroundColor = '#2196F3'; // Blue for default info
            }

            document.body.appendChild(notification);

            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
                window.location.href = "/profile.html";
            }, 3000);
        }

        async function fetchProfile() {
            const profileUrl = `${link}/api/v1/profile/getprofile`;
            const authToken = localStorage.getItem("authToken");

            if (!authToken) {
                showNotification("Authorization token not found. Please log in.", 'error');
                window.location.href = "/index.html";
                return;
            }

            try {
                const profileResponse = await axios.get(profileUrl, {
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                        "Content-Type": "application/json"
                    }
                });
                populateForm(profileResponse.data.user);
            } catch (error) {
                showNotification("Error fetching profile. Please try again.", 'error');
                console.error("Error fetching profile:", error.message);
            }
        }

        function populateForm(user) {
            document.getElementById("username").value = user.username || "";
            document.getElementById("email").value = user.email || "";
            const profileImage = document.getElementById("profile-image").querySelector("img");
            if (user.profileImage) {
                profileImage.src = user.profileImage;
            }
        }

        document.getElementById("edit-profile-form").addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const updateUrl = `${link}/api/v1/profile/editprofile`;
            const authToken = localStorage.getItem("authToken");

            try {
                const response = await axios.post(updateUrl, formData, {
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                        "Content-Type": "multipart/form-data"
                    }
                });

                showNotification("Profile updated successfully!", 'success');
                fetchProfile(); // Refresh the profile
            } catch (error) {
                showNotification("Failed to update profile. Please try again.", 'error');
                console.error("Error updating profile:", error.message);
            }
        });

        window.onload = fetchProfile;