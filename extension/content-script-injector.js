// This script runs on localhost:5173 to sync tokens from website to extension
(function() {
  // Only run on your frontend domain
  if (window.location.hostname === 'localhost' && window.location.port === '5173') {
    
    // Listen for storage changes and sync to chrome.storage
    window.addEventListener('storage', (e) => {
      if (e.key === 'token' && e.newValue) {
        if (typeof chrome !== 'undefined' && chrome.storage) {
          chrome.storage.local.set({ token: e.newValue });
          console.log('Token synced to extension storage');
        }
      }
    });

    // Initial sync on page load
    const token = localStorage.getItem('token');
    if (token && typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ token: token });
      console.log('Initial token sync to extension storage');
    }
  }
})();