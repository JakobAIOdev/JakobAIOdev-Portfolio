# Terminal-Inspired Portfolio Website

Welcome to my terminal-inspired portfolio! 🚀

This project combines creativity and interactivity, offering a unique way to explore my portfolio through a fully functional terminal interface with click-based navigation support.

![Portfolio Screenshot](https://github.com/user-attachments/assets/1fc2a3c4-c34b-4e16-a785-2581a43a47b3)

---

## ✨ Features

### 🖥️ Interactive Terminal Navigation
- **Full terminal emulation** with commands like `ls`, `cd`, `cat`, `pwd`, `clear`, and `help`
- Navigate through different sections (about, projects, contact, tools) using terminal commands
- Auto-complete functionality with Tab key for commands and file/directory names
- Real-time terminal output with smooth scrolling

### 🎨 Click-Based Navigation
- **Click on icons** to navigate directories or open links
- **Back button (←)** in terminal header for quick navigation
- **Click the heading "JakobAIO"** to return to root directory
- Perfect for mobile devices and touch interfaces

### 📱 Mobile Optimization
- **Auto-hide terminal input** on mobile devices for cleaner interface
- All navigation fully functional through clicking icons
- Responsive design that adapts to all screen sizes
- Optimized touch targets for better usability

### 🌗 Light / Dark Mode
- **Toggle between Light and Dark Mode** using the switch in top-right corner
- Dark mode persists across sessions using localStorage
- Smooth transitions between themes

### 📖 Help System
- **Interactive help button (?)** in top-left corner
- Displays all available terminal commands with descriptions
- Help popup is responsive and works on all devices

### 🎯 Terminal Commands
- `ls` - List all files and directories in current location
- `cd <name>` - Navigate to directory or open file/link
- `cd ..` - Go up one directory level
- `cd` - Return to root directory
- `cat <file>` - Display file contents without changing directory
- `pwd` - Print working directory path
- `clear` - Clear terminal output
- `help` or `?` - Display help information

### 🎨 Visual Elements
- **SVG icons** for tools (Python, JavaScript, Ruby, Rails, etc.)
- **SVG icons** for contact links (GitHub, Instagram, LinkedIn, etc.)
- **Directory folders** with visual indicators
- **Color-coded output** for better readability
- macOS-style terminal window with traffic light buttons

---

## 📁 Directory Structure

```
/
├── about/
│   └── about.txt
├── projects/
│   ├── Sneaker-Scraper-C#
│   ├── Sneaker-Scraper-Python
│   └── Portfolio-Website
├── contact/
│   ├── github
│   ├── instagram
│   ├── email
│   ├── linkedin
│   └── x
└── tools/
    ├── python, csharp, golang
    ├── javascript, typescript
    ├── html, css, php
    ├── postgresql, ruby, rails
    ├── puppeteer, selenium
    ├── aws, figma
    └── ... (more tools)
```

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Responsive styling with media queries
- **JavaScript (ES6+)** - Terminal logic, navigation, and interactivity
- **SVG Icons** - Clean, scalable graphics for tools and contacts
- **LocalStorage** - Persistent dark mode preference

---

## 🎮 How to Use

### Desktop Users
1. Type commands into the terminal (e.g., `cd projects`)
2. Use Tab for auto-completion
3. Click the back button (←) to go back
4. Click on icons to navigate (works in addition to typing)
5. Use `help` to see all available commands

### Mobile Users
1. Terminal input is hidden by default
2. Click on icons to navigate through directories
3. Use the back button (←) to go back one level
4. Click the heading to return to root

### All Users
- Click the **? button** for help and command reference
- Use the **dark mode toggle** to switch themes
- Click **"JakobAIO"** heading to return to root anytime

---

## 📱 Responsive Design

- **Desktop (1024px+)**: Full terminal experience with input enabled
- **Tablet (768px-1023px)**: Optimized spacing and button sizes
- **Mobile (<768px)**: Touch-optimized with hidden terminal input
- **Small Mobile (<480px)**: Compact layout with appropriate font sizes

---

## 🚀 Live Demo

[Check out the live portfolio here!](https://jakobaio.dev)

---

## 📂 File Structure

```
JakobAIOdev-Portfolio/
├── index.html
├── script.js           (Main terminal logic)
├── styles.css          (All styling including responsive)
├── dark-mode.js        (Dark mode functionality)
├── easy-mode.js        (Mobile input handling)
├── help.js             (Help popup functionality)
├── fonts.css           (Font imports)
├── CNAME               (Custom domain)
└── icons/              (SVG icons for tools & contacts)
```

---

## 🎯 Key Features Explained

### Terminal Emulation
The terminal provides a fully functional command interface with:
- Virtual file system navigation
- Command parsing and execution
- Auto-scrolling output
- Terminal line limit to prevent memory issues

### Auto-Completion
Tab key provides intelligent auto-completion:
- **Commands**: Type `cd` and press Tab to cycle through available commands
- **Files/Directories**: Type `cd p` and press Tab to auto-complete matching names
- **Case-insensitive**: Works regardless of letter case

### Responsive Mobile Experience
Mobile devices automatically hide the terminal input and rely on:
- Icon clicking for navigation
- Back button for hierarchy navigation
- Heading click to return home
- All functionality preserved without typing

---

## 💡 Design Philosophy

This portfolio demonstrates:
- **Creative UI/UX**: Unique terminal interface
- **Accessibility**: Multiple navigation methods
- **Responsive Design**: Works seamlessly on all devices
- **Performance**: Optimized for quick loading and smooth interactions
- **User-Friendly**: No terminal knowledge required for mobile users

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👨‍💻 About Me

I'm JakobAIO, a web developer focused on transforming ideas into powerful tools. I specialize in web automation, creating efficient web scrapers and sneaker bots. Explore my portfolio to learn more about my projects and skills!

Check out the live site: [jakobaio.dev](https://jakobaio.dev)
