document.addEventListener('DOMContentLoaded', () => {
    const helpButton = document.getElementById('help-button');
    const helpPopupOverlay = document.getElementById('help-popup-overlay');
    const helpPopup = document.getElementById('help-popup');
    const closeHelpPopup = document.getElementById('close-help-popup');

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
