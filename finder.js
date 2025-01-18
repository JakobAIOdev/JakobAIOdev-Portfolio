document.addEventListener('DOMContentLoaded', () => {
    const finderPath = document.getElementById('finder-path');
    const finderContent = document.getElementById('finder-content');
    const terminalSection = document.getElementById('terminal-section');
    const finderSection = document.getElementById('finder-section');
    const projectsFinderSection = document.getElementById('projects-finder-section');
    const contactFinderSection = document.getElementById('contact-finder-section');
    let currentPath = ['About'];

    window.openFile = (fileName) => {
        if (fileName === 'about.txt') {
            finderContent.innerHTML = `
                <div class="file-content">
                    <p>Hi, I'm Jakob. I have a deep passion for web scraping and web automation. Over the years, I have built numerous sneaker bots and scrapers, leveraging my skills to create powerful tools that automate complex tasks. My journey in web development has equipped me with a strong foundation in various programming languages and technologies.</p>
                </div>
            `;
            currentPath.push('about.txt');
            updatePath();
        } else if (fileName === 'github') {
            window.open('https://github.com/JakobAIOdev', '_blank');
        } else if (fileName === 'instagram') {
            window.open('https://www.instagram.com/jakob.aio', '_blank');
        } else if (fileName === 'email') {
            window.location.href = 'mailto:request@jakobaio.com';
        } else if (fileName === 'linkedin') {
            window.open('https://linkedin.com/in/yourusername', '_blank');
        } else if (fileName === 'X') {
            window.open('https://x.com/jakobaio', '_blank');
        }
    };

    window.openFolder = (folderName) => {
        if (folderName === 'tools') {
            finderContent.innerHTML = `
                <div class="file" onclick="openFile('python')">
                    <img src="icons/python.svg" alt="Python">
                    <span>Python</span>
                </div>
                <div class="file" onclick="openFile('csharp')">
                    <img src="icons/csharp.svg" alt="C#">
                    <span>C#</span>
                </div>
                <div class="file" onclick="openFile('golang')">
                    <img src="icons/golang-icon.png" alt="Golang">
                    <span>Golang</span>
                </div>
                <div class="file" onclick="openFile('javascript')">
                    <img src="icons/javascript.svg" alt="JavaScript">
                    <span>JavaScript</span>
                </div>
                <div class="file" onclick="openFile('html')">
                    <img src="icons/html5.svg" alt="HTML">
                    <span>HTML</span>
                </div>
                <div class="file" onclick="openFile('css')">
                    <img src="icons/css.svg" alt="CSS">
                    <span>CSS</span>
                </div>
                <div class="file" onclick="openFile('php')">
                    <img src="icons/php.svg" alt="PHP">
                    <span>PHP</span>
                </div>
                <div class="file" onclick="openFile('PostgreSQL')">
                    <img src="icons/postgresql.svg" alt="PostgreSQL">
                    <span>PostgreSQL</span>
                </div>
                <div class="file" onclick="openFile('puppeteer')">
                    <img src="icons/puppeteer.svg" alt="Puppeteer">
                    <span>Puppeteer</span>
                </div>
                <div class="file" onclick="openFile('selenium')">
                    <img src="icons/selenium.svg" alt="Selenium">
                    <span>Selenium</span>
                </div>
                <div class="file" onclick="openFile('aws')">
                    <img src="icons/aws.svg" alt="AWS">
                    <span>AWS</span>
                </div>
                <div class="file" onclick="openFile('figma')">
                    <img src="icons/figma.svg" alt="Figma">
                    <span>Figma</span>
                </div>
            `;
            currentPath.push('tools');
            updatePath();
        } else if (folderName === 'project1') {
            window.open('https://github.com/JakobAIOdev/Sneaker-Price-Scraper-Discord-Csharp', '_blank');
        } else if (folderName === 'project2') {
            window.open('https://github.com/JakobAIOdev/Sneaker-Scraper-Discord', '_blank');
        } else if (folderName === 'project3') {
            window.open('https://github.com/JakobAIOdev/JakobAIOdev-Portfolio', '_blank');
        }
    };

    window.goBack = () => {
        if (currentPath.length > 1) {
            currentPath.pop();
            if (currentPath[currentPath.length - 1] === 'About') {
                finderContent.innerHTML = `
                    <div class="file" onclick="openFile('about.txt')">
                        <img src="icons/about-txt-icon.png" alt="File">
                        <span>about.txt</span>
                    </div>
                    <div class="folder" onclick="openFolder('tools')">
                        <img src="icons/folder-icon.png" alt="Folder">
                        <span>tools</span>
                    </div>
                `;
            } else if (currentPath[currentPath.length - 1] === 'tools') {
                openFolder('tools');
            } else if (currentPath[currentPath.length - 1] === 'Projects') {
                projectsFinderSection.style.display = 'block';
                finderSection.style.display = 'none';
            } else if (currentPath[currentPath.length - 1] === 'Contact') {
                contactFinderSection.style.display = 'block';
                finderSection.style.display = 'none';
            } else {
                openFolder(currentPath[currentPath.length - 1]);
            }
            updatePath();
        } else {
            finderSection.style.display = 'none';
            projectsFinderSection.style.display = 'none';
            contactFinderSection.style.display = 'none';
            terminalSection.style.display = 'block';
        }
    };

    function updatePath() {
        finderPath.textContent = currentPath.join(' > ');
    }
});
