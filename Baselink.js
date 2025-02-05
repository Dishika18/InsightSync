document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");

    
    if (localStorage.getItem("authToken")) {
        logoutBtn.style.display = "block"; 
    }

    
    logoutBtn.addEventListener("click", function () {
        
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken"); 

    
        window.location.href = "index.html"; 
    });
});
const link = "https://insight-sync-u1bq.vercel.app"

export {link}