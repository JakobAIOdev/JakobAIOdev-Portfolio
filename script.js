document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalContent = document.getElementById('terminal-content');
    const backButton = document.getElementById('back-button');
    const heading = document.querySelector('h1');

    // Virtual file system structure
    const fs = {
        '/': {
            type: 'dir',
            children: {
                about: {
                    type: 'dir',
                    children: {
                        'about.txt': { type: 'file', content: `Hi, I'm JakobAIO,\na web developer focused on transforming ideas into powerful tools.\nI specialize in web automation, creating efficient web scrapers and sneaker bots. These projects taught me to optimize performance, work with APIs, and navigate complex websites.\nI'm passionate about solving challenges, streamlining workflows, and crafting dynamic, user-friendly tools.` }
                    }
                },
                projects: {
                    type: 'dir',
                    children: {
                        'Sneaker-Scraper-C#': { type: 'link', url: 'https://github.com/JakobAIOdev/Sneaker-Price-Scraper-Discord-Csharp' },
                        'Sneaker-Scraper-Python': { type: 'link', url: 'https://github.com/JakobAIOdev/Sneaker-Scraper-Discord' },
                        'Portfolio-Website': { type: 'link', url: 'https://github.com/JakobAIOdev/JakobAIOdev-Portfolio' }
                    }
                },
                contact: {
                    type: 'dir',
                    children: {
                        github: { type: 'link', url: 'https://github.com/JakobAIOdev' },
                        instagram: { type: 'link', url: 'https://www.instagram.com/jakob.aio' },
                        email: { type: 'link', url: 'mailto:request@jakobaio.com' },
                        linkedin: { type: 'link', url: 'https://linkedin.com/in/yourusername' },
                        x: { type: 'link', url: 'https://x.com/jakobaio' }
                    }
                },
                tools: {
                    type: 'dir',
                    children: {
                        python: { type: 'file', content: 'Python: Used for automation and scripting.' },
                        csharp: { type: 'file', content: 'C#: Used for desktop and bot development.' },
                        golang: { type: 'file', content: 'Golang: Used for high-performance backend.' },
                        javascript: { type: 'file', content: 'JavaScript: Used for web development.' },
                        typescript: { type: 'file', content: 'TypeScript: Used for type-safe JavaScript development.' },
                        html: { type: 'file', content: 'HTML: Markup language for web.' },
                        css: { type: 'file', content: 'CSS: Styling for web.' },
                        php: { type: 'file', content: 'PHP: Backend scripting.' },
                        postgresql: { type: 'file', content: 'PostgreSQL: Database.' },
                        ruby: { type: 'file', content: 'Ruby: Dynamic, object-oriented scripting language.' },
                        rails: { type: 'file', content: 'Ruby on Rails: Web application framework for rapid development.' },
                        puppeteer: { type: 'file', content: 'Puppeteer: Headless browser automation.' },
                        selenium: { type: 'file', content: 'Selenium: Browser automation.' },
                        aws: { type: 'file', content: 'AWS: Cloud services.' },
                        figma: { type: 'file', content: 'Figma: UI/UX design.' }
                    }
                }
            }
        }
    };

    let cwd = ['/'];
    const MAX_LINES = 50; // Limit terminal lines to prevent flooding

    function getNode(pathArr) {
        let node = fs['/'];
        for (let i = 1; i < pathArr.length; i++) {
            if (!node.children) return null;
            const keys = Object.keys(node.children);
            const match = keys.find(k => k.toLowerCase() === pathArr[i].toLowerCase());
            if (!match) return null;
            node = node.children[match];
        }
        return node;
    }

    function scrollToBottom() {
        // Force scroll immediately without delays
        terminalContent.scrollTop = terminalContent.scrollHeight;
        // Backup: use requestAnimationFrame as well
        requestAnimationFrame(() => {
            terminalContent.scrollTop = terminalContent.scrollHeight;
        });
    }

    function trimTerminal() {
        const lines = terminalContent.querySelectorAll('p');
        if (lines.length > MAX_LINES) {
            const toRemove = lines.length - MAX_LINES;
            for (let i = 0; i < toRemove; i++) {
                lines[i].remove();
            }
        }
    }

    function printLine(text, opts = {}) {
        const p = document.createElement('p');
        if (opts.html) {
            p.innerHTML = text;
        } else {
            p.textContent = text;
        }
        p.style.textAlign = 'left';
        p.style.margin = '0.25rem 0';
        p.style.padding = '0';
        if (opts.error) p.style.color = '#ff7777';
        if (opts.command) p.className = 'terminal-command';
        terminalContent.appendChild(p);
        trimTerminal();
        scrollToBottom();
    }

    // --- Tab Autocompletion with cycling ---
    const COMMANDS = ['help', 'ls', 'cd', 'cat', 'pwd', 'clear', '?'];
    let tabState = { lastValue: '', matches: [], index: 0 };

    terminalInput.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const value = terminalInput.value;
            const parts = value.split(/\s+/);
            if (parts.length === 1 && parts[0]) {
                // Complete command
                const matches = COMMANDS.filter(cmd => cmd.startsWith(parts[0]));
                if (matches.length === 1) {
                    terminalInput.value = matches[0] + ' ';
                    tabState = { lastValue: '', matches: [], index: 0 };
                } else if (matches.length > 1) {
                    if (tabState.lastValue === value && tabState.matches.length === matches.length) {
                        tabState.index = (tabState.index + 1) % matches.length;
                        terminalInput.value = matches[tabState.index];
                    } else {
                        printLine(matches.join('    '));
                        tabState = { lastValue: value, matches, index: 0 };
                    }
                }
            } else if (parts.length > 1 && parts[1]) {
                // Complete argument (file/dir/link)
                const node = getNode(cwd);
                if (node && node.children) {
                    const arg = parts[1].toLowerCase();
                    const names = Object.keys(node.children);
                    const matches = names.filter(n => n.toLowerCase().startsWith(arg));
                    if (matches.length === 1) {
                        const suffix = node.children[matches[0]].type === 'dir' ? '/' : '';
                        terminalInput.value = parts[0] + ' ' + matches[0] + suffix;
                        tabState = { lastValue: '', matches: [], index: 0 };
                    } else if (matches.length > 1) {
                        if (tabState.lastValue === value && tabState.matches.length === matches.length) {
                            tabState.index = (tabState.index + 1) % matches.length;
                            const suffix = node.children[matches[tabState.index]].type === 'dir' ? '/' : '';
                            terminalInput.value = parts[0] + ' ' + matches[tabState.index] + suffix;
                        } else {
                            printLine(matches.join('    '));
                            tabState = { lastValue: value, matches, index: 0 };
                        }
                    }
                }
            }
        } else {
            tabState = { lastValue: '', matches: [], index: 0 };
        }
    });

    function printPrompt() {
        printLine(
            `<span style="color:#26C8F3">jakob@home</span>:<span style="color:#8be9fd">${cwd.join('/') === '/' ? '~' : cwd.join('/').replace('/', '~/')}</span>$ `,
            { html: true, command: true }
        );
    }

    const ICONS = {
        dir: '📁',
        file: '📄',
        link: '🔗'
    };

    const TOOL_ICONS = {
        python: '/icons/python.svg',
        csharp: '/icons/csharp.svg',
        golang: '/icons/golang.svg',
        javascript: '/icons/javascript.svg',
        typescript: '/icons/typescript.svg',
        html: '/icons/html5.svg',
        css: '/icons/css.svg',
        php: '/icons/php.svg',
        postgresql: '/icons/postgresql.svg',
        ruby: '/icons/ruby.svg',
        rails: '/icons/rails.svg',
        puppeteer: '/icons/puppeteer.svg',
        selenium: '/icons/selenium.svg',
        aws: '/icons/aws.svg',
        figma: '/icons/figma.svg'
    };

    const CONTACT_ICONS = {
        github: '/icons/github-icon-light.svg',
        instagram: '/icons/instagram.svg',
        email: '/icons/gmail.svg',
        linkedin: '/icons/linkedin.svg',
        x: '/icons/x.svg'
    };

    function ls() {
        const node = getNode(cwd);
        if (!node || !node.children) {
            printLine('ls: not a directory', { error: true });
            return;
        }
        const names = Object.keys(node.children);
        if (names.length === 0) {
            printLine('<span style="color:#555">[empty]</span>', { html: true });
            return;
        }
        let html = `<div style="display:flex;flex-wrap:wrap;gap:1.5em 2.5em;margin:1em 0 1em 0;">`;
        names.forEach(nameRaw => {
            const child = node.children[nameRaw];
            let color = "#eaeaea";
            let cls = "";
            let icon = ICONS[child.type] || '';
            let name = nameRaw;
        
            if (child.type === 'file' && TOOL_ICONS[nameRaw]) {
                icon = `<img src="${TOOL_ICONS[nameRaw]}" style="width:2rem;height:2rem;border-radius:4px;" alt="${nameRaw}">`;
            }
            
            if (child.type === 'link' && CONTACT_ICONS[nameRaw]) {
                icon = `<img src="${CONTACT_ICONS[nameRaw]}" style="width:2rem;height:2rem;border-radius:4px;" alt="${nameRaw}">`;
            }
            
            if (child.type === 'dir') {
                color = "#50fa7b";
                cls = "ls-dir";
                name += '/';
            } else if (child.type === 'file') {
                color = "#f1fa8c";
                cls = "ls-file";
            } else if (child.type === 'link') {
                color = "#8be9fd";
                cls = "ls-link";
            }
            html += `<div style="display:flex;flex-direction:column;align-items:center;min-width:70px;" data-name="${nameRaw}" data-type="${child.type}">
                <span class="${cls}" style="color:${color};font-size:2rem;cursor:pointer">${icon}</span>
                <span class="${cls}" style="color:${color};font-size:1rem;cursor:pointer;margin-top:0.2em">${name}</span>
            </div>`;
        });
        html += `</div>`;
        printLine(html, { html: true });
    }

    function cd(arg) {
        if (!arg) {
            cwd = ['/'];
            return true;
        }

        const name = arg.replace(/\/+$/, '').trim();
        if (name === '..') {
            if (cwd.length > 1) cwd.pop();
            return true;
        }
        const node = getNode(cwd);
        if (!node || !node.children) {
            printLine(`cd: no such directory: ${arg}`, { error: true });
            return false;
        }
        
        const keys = Object.keys(node.children);
        const realKey = keys.find(k => k.toLowerCase() === name.toLowerCase());
        
        if (!realKey) {
            printLine(`cd: no such directory: ${arg}`, { error: true });
            return false;
        }
        
        const child = node.children[realKey];
        if (child.type === 'file') {
            printLine(child.content.replace(/\n/g, '<br>'), { html: true });
            return false;
        } else if (child.type === 'link') {
            window.open(child.url, '_blank');
            printLine(`Opened <span style="color:#8be9fd">${realKey}</span> in new tab.`, { html: true });
            return false;
        } else if (child.type === 'dir') {
            cwd = ['/'];
            cwd.push(realKey);
            return true;
        }
        
        return false;
    }

    function pwd() {
        printLine(cwd.join('/') === '/' ? '/' : cwd.join('/').replace('/', '/'));
    }

    function clear() {
        terminalContent.innerHTML = '';
        renderDir();
    }

    function cat(arg) {
        if (!arg) {
            printLine('cat: missing operand', { error: true });
            return;
        }

        const name = arg.replace(/\/+$/, '').trim();
        const node = getNode(cwd);
        
        if (!node || !node.children) {
            printLine(`cat: no such file: ${arg}`, { error: true });
            return;
        }
        
        const keys = Object.keys(node.children);
        const realKey = keys.find(k => k.toLowerCase() === name.toLowerCase());
        
        if (!realKey) {
            printLine(`cat: no such file: ${arg}`, { error: true });
            return;
        }
        
        const child = node.children[realKey];
        if (child.type === 'file') {
            printLine(child.content.replace(/\n/g, '<br>'), { html: true });
        } else if (child.type === 'link') {
            printLine(`cat: ${arg}: cannot read link (use 'cd' to open)`, { error: true });
        } else if (child.type === 'dir') {
            printLine(`cat: ${arg}: is a directory`, { error: true });
        }
    }

    function help() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const cmdColor = isDarkMode ? '#7C52E5' : '#50fa7b';
        [
            `<span style="color:${cmdColor}">help</span>             - show this help`,
            `<span style="color:${cmdColor}">ls</span>               - list directories/files`,
            `<span style="color:${cmdColor}">cd</span>               - go back to root directory`,
            `<span style="color:${cmdColor}">cd &lt;dir&gt;</span>         - change directory or view file/open link`,
            `<span style="color:${cmdColor}">cd ..</span>            - go up one directory`,
            `<span style="color:${cmdColor}">cat &lt;file&gt;</span>       - display file contents`,
            `<span style="color:${cmdColor}">pwd</span>              - print working directory`,
            `<span style="color:${cmdColor}">clear</span>            - clear the terminal output`
        ].forEach(l => printLine(l, { html: true }));
    }

    function renderDir() {
        printPrompt();
        ls();
        scrollToBottom();
    }

    function handleCommand(command) {
        const cmd = String(command || '').trim();
        if (!cmd) return;

        const parts = cmd.split(/\s+/);
        const head = parts[0].toLowerCase();
        const arg = parts.slice(1).join(' ');

        let rerenderDir = true;

        switch (head) {
            case 'help':
            case '?':
                terminalContent.innerHTML = '';
                help();
                break;
            case 'ls':
                terminalContent.innerHTML = '';
                printPrompt();
                printLine(cmd, { command: true });
                ls();
                break;
            case 'cd':
                rerenderDir = cd(arg);
                break;
            case 'cat':
                terminalContent.innerHTML = '';
                printPrompt();
                printLine(cmd, { command: true });
                cat(arg);
                break;
            case 'pwd':
                terminalContent.innerHTML = '';
                printPrompt();
                printLine(cmd, { command: true });
                pwd();
                break;
            case 'clear':
                clear();
                rerenderDir = false;
                break;
            default:
                terminalContent.innerHTML = '';
                printPrompt();
                printLine(cmd, { command: true });
                printLine(`${head}: command not found. Type 'help' for available commands.`, { error: true });
                break;
        }
        if (rerenderDir) {
            terminalContent.innerHTML = '';
            renderDir();
        }
        scrollToBottom();
    }

    // Initial terminal state
    terminalContent.innerHTML = '';
    renderDir();

    if (backButton) {
        backButton.addEventListener('click', () => {
            const previousPath = cwd.length > 1 ? cwd[cwd.length - 1] : '/';
            
            if (cwd.length > 1) {
                cwd.pop();
            } else {
                cwd = ['/'];
            }
            
            terminalContent.innerHTML = '';
            printPrompt();
            printLine(`cd ..`, { command: true });
            renderDir();
        });
    }

    // Heading click to go to root
    if (heading) {
        heading.style.cursor = 'pointer';
        heading.addEventListener('click', () => {
            cwd = ['/'];
            terminalContent.innerHTML = '';
            renderDir();
        });
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const command = terminalInput.value.trim();
                terminalInput.value = '';
                handleCommand(command);
                event.preventDefault();
            }
        });
    }

    terminalContent.addEventListener('click', (e) => {
        const itemDiv = e.target.closest('div[data-name]');
        if (!itemDiv) return;

        const name = itemDiv.getAttribute('data-name');
        const type = itemDiv.getAttribute('data-type');

        if (type === 'dir' || type === 'file' || type === 'link') {
            window.handleTerminalCommand('cd ' + name);
        }
    });

    window.handleTerminalCommand = handleCommand;
});