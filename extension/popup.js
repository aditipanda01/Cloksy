// popup.js - Updated with Chrome Storage and Login

let currentToken = null;

// Check if user is logged in
async function checkAuth() {
  const result = await chrome.storage.local.get(['authToken']);
  currentToken = result.authToken;
  
  if (currentToken) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('internshipSection').style.display = 'block';
    loadScrapedData();
  } else {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('internshipSection').style.display = 'none';
  }
}

// Login handler
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    const res = await fetch('https://prominder.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    
    if (res.ok && data.token) {
      // Store token in Chrome storage
      await chrome.storage.local.set({ authToken: data.token });
      currentToken = data.token;
      document.getElementById('loginError').innerText = '';
      checkAuth();
    } else {
      document.getElementById('loginError').innerText = data.msg || 'Login failed';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('loginError').innerText = 'Server error';
  }
});

// Logout handler
document.getElementById('logoutBtn')?.addEventListener('click', async () => {
  await chrome.storage.local.remove(['authToken']);
  currentToken = null;
  checkAuth();
});

// Load scraped data
function loadScrapedData() {
  chrome.runtime.sendMessage({ type: "GET_INTERNSHIP" }, (data) => {
    if (data) {
      document.getElementById("title").value = data.title || "";
      document.getElementById("description").value = data.description || "";
      document.getElementById("link").value = data.link || "";
    }
  });
}

// Save internship handler
document.getElementById("internshipForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!currentToken) {
    document.getElementById("status").innerText = "❌ Please login first";
    return;
  }

  const internship = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    link: document.getElementById("link").value,
    deadline: document.getElementById("deadline").value,
    reminderDate: document.getElementById("reminderDate").value
  };

  try {
   const res = await fetch("https://prominder.onrender.com/api/internships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${currentToken}`
      },
      body: JSON.stringify(internship)
    });

    if (res.ok) {
      document.getElementById("status").innerText = "✅ Internship saved!";
      // Clear form
      document.getElementById("internshipForm").reset();
    } else {
      const error = await res.json();
      document.getElementById("status").innerText = `❌ Error: ${error.msg || 'Failed to save'}`;
    }
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "⚠️ Server error.";
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", checkAuth);