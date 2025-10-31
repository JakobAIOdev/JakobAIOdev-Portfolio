document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');

    // Hide terminal input on mobile devices by default
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        terminalInput.style.display = 'none';
    }
});
