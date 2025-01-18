document.addEventListener('DOMContentLoaded', () => {
    const easyModeToggle = document.getElementById('easy-mode-toggle');
    const terminalInput = document.getElementById('terminal-input');
    const terminalSection = document.getElementById('terminal-section');
    const terminalContent = document.getElementById('terminal-content');
    const finderSection = document.getElementById('finder-section');
    const projectsFinderSection = document.getElementById('projects-finder-section');
    const contactFinderSection = document.getElementById('contact-finder-section');

    const activateEasyMode = () => {
        terminalInput.disabled = true;
        easyModeToggle.textContent = 'Disable Easy Mode';
        easyModeToggle.classList.add('active');

        const message = document.createElement('p');
        message.textContent = 'Easy mode activated';
        message.classList.add('easy-mode-message');
        terminalContent.appendChild(message);

        terminalInput.style.display = 'none';

        const aboutElement = terminalContent.querySelector('ul li:nth-child(1)');
        const projectsElement = terminalContent.querySelector('ul li:nth-child(2)');
        const contactElement = terminalContent.querySelector('ul li:nth-child(3)');

        aboutElement.style.cursor = 'pointer';
        aboutElement.style.color = '#eaeaea';
        aboutElement.addEventListener('click', () => {
            terminalSection.style.display = 'none';
            finderSection.style.display = 'block';
            projectsFinderSection.style.display = 'none';
            contactFinderSection.style.display = 'none';
        });

        projectsElement.style.cursor = 'pointer';
        projectsElement.style.color = '#eaeaea';
        projectsElement.addEventListener('click', () => {
            terminalSection.style.display = 'none';
            finderSection.style.display = 'none';
            projectsFinderSection.style.display = 'block';
            contactFinderSection.style.display = 'none';
        });

        contactElement.style.cursor = 'pointer';
        contactElement.style.color = '#eaeaea';
        contactElement.addEventListener('click', () => {
            terminalSection.style.display = 'none';
            finderSection.style.display = 'none';
            projectsFinderSection.style.display = 'none';
            contactFinderSection.style.display = 'block';
        });
    };

    const deactivateEasyMode = () => {
        terminalInput.disabled = false;
        easyModeToggle.textContent = 'Easy Mode';
        easyModeToggle.classList.remove('active');

        const messages = terminalContent.querySelectorAll('p');
        messages.forEach(msg => {
            if (msg.textContent === 'Easy mode activated') {
                terminalContent.removeChild(msg);
            }
        });

        terminalInput.style.display = 'block';

        const aboutElement = terminalContent.querySelector('ul li:nth-child(1)');
        const projectsElement = terminalContent.querySelector('ul li:nth-child(2)');
        const contactElement = terminalContent.querySelector('ul li:nth-child(3)');

        aboutElement.style.cursor = 'default';
        aboutElement.style.color = '#eaeaea';
        aboutElement.replaceWith(aboutElement.cloneNode(true));

        projectsElement.style.cursor = 'default';
        projectsElement.style.color = '#eaeaea';
        projectsElement.replaceWith(projectsElement.cloneNode(true));

        contactElement.style.cursor = 'default';
        contactElement.style.color = '#eaeaea';
        contactElement.replaceWith(contactElement.cloneNode(true));
    };

    easyModeToggle.addEventListener('click', () => {
        if (terminalInput.disabled) {
            deactivateEasyMode();
        } else {
            activateEasyMode();
        }
    });

    // Activate easy mode by default if the user opens the site on a phone
    if (window.innerWidth <= 768) {
        activateEasyMode();
    }
});
