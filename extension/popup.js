document.addEventListener("DOMContentLoaded", () => {
  // Get latest scraped internship
  chrome.runtime.sendMessage({ type: "GET_INTERNSHIP" }, (data) => {
    if (data) {
      document.getElementById("title").value = data.title || "";
      document.getElementById("description").value = data.description || "";
      document.getElementById("link").value = data.link || "";
    }
  });

  document.getElementById("internshipForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const internship = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      link: document.getElementById("link").value,
      deadline: document.getElementById("deadline").value,
      reminderDate: document.getElementById("reminderDate").value
    };

    try {
      let res = await fetch("http://localhost:5000/api/internships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token") // from your auth
        },
        body: JSON.stringify(internship)
      });

      if (res.ok) {
        document.getElementById("status").innerText = "✅ Internship saved!";
      } else {
        document.getElementById("status").innerText = "❌ Error saving internship.";
      }
    } catch (err) {
      console.error(err);
      document.getElementById("status").innerText = "⚠️ Server error.";
    }
  });
});
