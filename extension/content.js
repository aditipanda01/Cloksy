// content.js

function scrapeInternship() {
  let data = {
    title: document.title || "Untitled Internship",
    description: "",
    link: window.location.href,
    deadline: "",        // user will fill in popup
    reminderDate: ""     // user will fill in popup
  };

  // Example: LinkedIn job description scraping
  let desc = document.querySelector(".jobs-description-content__text")?.innerText;
  if (desc) data.description = desc.substring(0, 300);

  // Send scraped data to popup
  chrome.runtime.sendMessage({ type: "SCRAPED_INTERNSHIP", data });
}

// Run when page loads
scrapeInternship();
