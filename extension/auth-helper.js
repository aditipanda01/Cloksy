document.getElementById('loginBtn').addEventListener('click', () => {
  // Open the login page
  chrome.tabs.create({ url: 'http://localhost:5173/login' });
  
  // Show status
  const status = document.getElementById('status');
  status.className = 'status success';
  status.innerText = 'Login page opened! After logging in, come back and try saving internships.';
});

// Check if token exists
chrome.storage.local.get(['token'], (result) => {
  if (result.token) {
    const status = document.getElementById('status');
    status.className = 'status success';
    status.innerText = '✅ You are logged in! You can close this and save internships.';
  }
});