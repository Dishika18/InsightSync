function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    // Set the background color based on the type of notification
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50'; // Green for success
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336'; // Red for error
    } else {
        notification.style.backgroundColor = '#2196F3'; // Blue for default info
    }

    // Style the notification
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.right = '10px';
    notification.style.zIndex = '9999';
    notification.style.fontSize = '16px';

    // Add notification to the body
    document.body.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


    // Button event listener
    import { link } from "./Baselink.js"
    console.log(link)
    const btn = document.getElementById("submitBtn");


    btn.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Get the form fields
        const title = document.getElementById("topicTitle").value;
        const content = document.getElementById("topicContent").value;
        const category = document.getElementById("topicCategory").value;
        const imageFile = document.getElementById("topicImage").files[0]; // Use `.files[0]` for file input

        // Validate required fields
        if (!title || !content  || !category || !imageFile) {
            showNotification("Please fill in all fields and select an image.", "error");
            return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append("title", title);
        formData.append("topic", category);
        formData.append("content", content);
        formData.append("imagefile", imageFile); // Append the file directly

        try {
            // Send POST request
            console.log(formData)
            const response = await axios.post(
                `${link}/api/v1/insight/addinsight`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for file upload
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                    },
                }
            );

            // Handle successful response
            console.log("Success:", response.data);
            showNotification("Topic submitted successfully!", "success");
        } catch (error) {
            // Handle error response
            console.error("Error:", error);
            showNotification("There was an error submitting your topic. Please try again.", "error");
        }
    });

    console.log("modules")
    const logoutbtn = document.getElementById("signout")
    const loginbtn = document.getElementById("loginbtn")
    const signupbtn = document.getElementById("signupbtn")
    // if (localStorage.getItem("authToken")) {
    //     console.log("hdbc")
    //     console.log(loginbtn)
    //     loginbtn.style.display = "none"
    //     signupbtn.style.display= "none"
    // }else{
    //     logoutbtn.style.display = "none"
    // }
    document.getElementById("logoutbtn2").addEventListener("click",()=>{
        console.log("clickedbskjkbvsdhvbskdmbvduksvbsdmhcbjh")
        localStorage.clear()
        window.location.href="/"
    })

    const textarea = document.getElementById("topicContent");
    const preview = document.getElementById("preview");
    const toggleBtn = document.getElementById("toggleBtn");
    let isMarkdown = false;

    toggleBtn.addEventListener("click", () => {
        if (isMarkdown) {
            // Switch to text editor mode
            preview.style.display = "none";
            textarea.style.display = "block";
            toggleBtn.textContent = "Switch to Preview";
        } else {
            // Switch to markdown preview mode
            preview.innerHTML = marked.parse(textarea.value);
            preview.style.display = "block";
            textarea.style.display = "none";
            toggleBtn.textContent = "Switch to Editor";
        }
        isMarkdown = !isMarkdown;
    });

    if (!localStorage.getItem('authToken')) {
        alert("You are not logged in...You will be redirected")
        window.location.href="/"
    }