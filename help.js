document.addEventListener('DOMContentLoaded', () => {
    const helpButton = document.getElementById('help-button');
    const helpPopupOverlay = document.getElementById('help-popup-overlay');
    const helpPopup = document.getElementById('help-popup');
    const closeHelpPopup = document.getElementById('close-help-popup');

    // Update help content dynamically
    const helpContent = document.querySelector('.help-popup-content p + ul');
    if (helpContent) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const codeColor = isDarkMode ? '#E93D83' : '#26C8F3';
        
        helpContent.innerHTML = `
            <li><span class="help-points"><strong>Terminal Commands:</strong></span><br>
                <code style="color:${codeColor}">ls</code> - list files/directories<br>
                <code style="color:${codeColor}">cd &lt;name&gt;</code> - navigate to directory or open file/link<br>
                <code style="color:${codeColor}">cd ..</code> - go up one directory<br>
                <code style="color:${codeColor}">cd</code> - go back to root<br>
                <code style="color:${codeColor}">cat &lt;file&gt;</code> - display file contents<br>
                <code style="color:${codeColor}">pwd</code> - show current path<br>
                <code style="color:${codeColor}">clear</code> - clear terminal<br>
                <code style="color:${codeColor}">help</code> - show help
            </li>
            <li><span class="help-points"><strong>Back Button:</strong></span><br> Use the ← button in the terminal header to quickly go back to the previous directory.</li>
            <li><span class="help-points"><strong>Dark Mode:</strong></span><br> Use the toggle switch in the top right corner to switch between light and dark modes.</li>
        `;
    }

    helpButton.addEventListener('click', () => {
        helpPopupOverlay.style.display = 'block';
    });

    closeHelpPopup.addEventListener('click', () => {
        helpPopupOverlay.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === helpPopupOverlay) {
            helpPopupOverlay.style.display = 'none';
        }
    });
});
