 // Function to check if online and redirect
 function checkOnlineStatus() {
    if (navigator.onLine) {
        // Redirect to the homepage when online
        window.location.href = '/';
    }
}

// Run the check immediately on page load
window.addEventListener('load', () => {
    checkOnlineStatus();

    // Check for online status every 5 seconds
    const intervalId = setInterval(() => {
        if (navigator.onLine) {
            checkOnlineStatus();
            clearInterval(intervalId); // Stop checking once online
        }
    }, 5000);
});

window.addEventListener('online', () => {
    checkOnlineStatus();
});