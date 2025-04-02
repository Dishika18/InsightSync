const GEMINI_API_KEY = "your_api_key"; // Replace with your actual API key

// Function to send article text to Gemini 1.5 Pro API for summarization
async function getAISummary(text) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: `Summarize this article in a few sentences: ${text}` }] }]
            })
        });

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Summary not available.";
    } catch (error) {
        console.error("Error generating summary:", error);
        return "Failed to generate summary.";
    }
}


async function summarizeArticle() {
    const articleContent = document.getElementById("topic-content").innerText.trim();
    
    if (!articleContent) {
        document.getElementById("summary-text").innerText = "Hit on the generate summary button.";
        return;
    }

    document.getElementById("summary-text").innerText = "Generating summary...";
    const summary = await getAISummary(articleContent);
    document.getElementById("summary-text").innerText = summary;
}


document.addEventListener("DOMContentLoaded", summarizeArticle);
