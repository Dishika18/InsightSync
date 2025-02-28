import { link } from "./Baselink.js";
import { fetchComments } from "./fetchcomment.js";
const params = new URLSearchParams(window.location.search);
const insightId = params.get('id');

document.getElementById("comment-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const commentText = document.getElementById("comment-text").value.trim();
    const token = localStorage.getItem("authToken"); // Assuming token is stored here

    if (!commentText) {
        alert("Please enter a comment.");
        return;
    }

    if (!token) {
        alert("You need to be logged in to comment.");
        return;
    }

    try {
        await axios.post(`${link}/api/v1/comment/addcomment`, 
            {
                i_id: insightId,
                comment: commentText
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        document.getElementById("comment-text").value = ""; // Clear input field
        fetchComments(); // Refresh comments
    } catch (error) {
        console.error("Error adding comment:", error);
        alert("Failed to add comment. Please try again.");
    }
});
