import { link } from "./Baselink.js";

const params = new URLSearchParams(window.location.search);
const insightId = params.get('id');

function fetchComments() {
    axios.get(`${link}/api/v1/comment/getcommentsbyinsight/${insightId}`)
        .then((resp) => {
            const commentsContainer = document.getElementById("comments-container");
            commentsContainer.innerHTML = ""; // Clear existing comments
            
            if (resp.data.comments.length === 0) {
                commentsContainer.innerHTML = "<p>No comments yet. Be the first to comment!</p>";
                return;
            }

            resp.data.comments.forEach(comment => {
                const profileImage = comment.userId?.image || "default-avatar.png"; // Fallback if no image
                const commentText = comment.comment || "No text"; // Ensure text exists
                const commentTimestamp = new Date(comment.createdAt).toLocaleString(); // Format timestamp

                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment");

                commentDiv.innerHTML = `
                    <div class="comment-wrapper">
                        <img src="${profileImage}" alt="User Avatar" class="comment-avatar">
                        <div class="comment-content">
                            <p>${commentText}</p>
                            <small>${commentTimestamp}</small>
                        </div>
                    </div>
                `;
                commentsContainer.appendChild(commentDiv);
            });
        })
        .catch((error) => {
            console.error("Error fetching comments:", error);
            document.getElementById("comments-container").innerHTML = "<p>Error loading comments.</p>";
        });
}

// Fetch comments when the page loads
document.addEventListener("DOMContentLoaded", fetchComments);

export { fetchComments };
