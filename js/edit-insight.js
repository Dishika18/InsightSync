import { link } from "./Baselink.js";

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            alert("No topic ID provided in the URL.");
            window.location.href = 'index.html';
        }

        const titleElement = document.getElementById("topic-title");
        const imageElement = document.getElementById("topic-image");
        const imageInput = document.getElementById("image-input");
        const contentElement = document.getElementById("topic-content");
        const submitButton = document.getElementById("submitbtn");

        // Fetch topic data by ID
        axios.post(`${link}/api/v1/insight/getinsightbyid`, { id: id })
            .then((response) => {
                const data = response.data;

                if (data.succes) {
                    titleElement.value = data.data.title || "Untitled Topic";
                    imageElement.src = data.data.Image || "placeholder.jpg";
                    imageElement.alt = data.data.title || "Topic Image";
                    contentElement.value = data.data.content || "";
                } else {
                    alert("Topic not found. Redirecting to home page.");
                    window.location.href = 'index.html';
                }
            })
            .catch((err) => {
                console.error("Error fetching topic:", err);
                alert("An error occurred while fetching the topic.");
            });

        // Submit updated topic data
        submitButton.addEventListener("click", () => {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("title", titleElement.value);
            formData.append("content", contentElement.value);

            // Append image if a new one is selected
            if (imageInput.files[0]) {
                formData.append("image", imageInput.files[0]);
            }

            axios.post(`${link}/api/v1/insight/editinsight`, formData, {
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('authToken')}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((response) => {
                console.log(response)
                if (response.data.succes) {
                    alert("Topic updated successfully.");
                    window.location.href = `topics-detail.html?id=${id}`;
                } else {
                    alert("Failed to update topic.");
                }
            })
            .catch((err) => {
                console.error("Error updating topic:", err);
                alert("An error occurred while updating the topic. You may not be the author of the topic");
            });
        });
        
        if (localStorage.getItem("authToken") == null) {
            alert("you are not logged in")
            window.location.href="index.html"
        }