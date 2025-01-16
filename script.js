document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalContent = document.getElementById('terminal-content');

    terminalInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = terminalInput.value.trim();
            terminalInput.value = '';
            handleCommand(command);
        }
    });

    function handleCommand(command) {
        const output = document.createElement('p');
        output.textContent = `jakob@home:~$ ${command}`;
        output.style.textAlign = 'left'; // Align text to the left
        terminalContent.appendChild(output);

        if (command === 'ls') {
            const list = document.createElement('ul');
            list.innerHTML = '<li>about</li><li>projects</li><li>contact</li>';
            terminalContent.appendChild(list);
        } else if (command.startsWith('cd ')) {
            const dir = command.split(' ')[1];
            if (['about', 'projects', 'contact'].includes(dir)) {
                window.location.href = `${dir}.html`;
            } else {
                const error = document.createElement('p');
                error.textContent = `bash: cd: ${dir}: No such file or directory`;
                error.style.color = '#ff0000'; // Red color for error message
                error.style.textAlign = 'left';
                terminalContent.appendChild(error);
            }
        } else {
            const error = document.createElement('p');
            error.textContent = `bash: ${command}: command not found`;
            error.style.color = '#ff0000'; // Red color for error message
            error.style.textAlign = 'left';
            terminalContent.appendChild(error);
        }

        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
});
