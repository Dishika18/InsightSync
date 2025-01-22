document.addEventListener("DOMContentLoaded", () => {
    const subscribeForm = document.getElementById("subscribeForm");
  
    subscribeForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent page reload
  
      const emailInput = document.getElementById("emailInput").value.trim();
      if (!emailInput) {
        alert("Please enter a valid email address.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailInput }),
        });
  
        if (response.ok) {
          const message = await response.text();
          alert(message); // Show success message
        } else {
          alert("Failed to subscribe. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while subscribing.");
      }
    });
  });
  