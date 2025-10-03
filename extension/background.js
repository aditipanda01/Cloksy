let latestInternship = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SCRAPED_INTERNSHIP") {
    latestInternship = msg.data;
  }
  if (msg.type === "GET_INTERNSHIP") {
    sendResponse(latestInternship);
  }
});
