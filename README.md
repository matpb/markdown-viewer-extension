# Markdown Viewer 📝✨

A Chrome extension that makes your markdown files look beautiful! Open any `.md` file in Chrome and watch it transform into gorgeously formatted HTML with syntax highlighting, dark mode, and more.

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Chrome](https://img.shields.io/badge/chrome-extension-orange)

---

## Why This Extension?

Ever opened a markdown file in your browser and been disappointed by the plain text? We felt the same way. This extension automatically detects markdown files and renders them with:

✨ **Beautiful GitHub-style formatting** - Looks just like GitHub
🎨 **Syntax highlighting** - 15+ programming languages supported
🌗 **Dark & Light themes** - Easy on the eyes, day or night
📋 **One-click copy** - Copy code blocks instantly
✅ **Task lists** - Checkboxes that actually look like checkboxes
📄 **Raw view toggle** - See the original markdown anytime
🔍 **Render selected text** - Select markdown on any webpage and render it instantly

---

## Installation

### Quick Start (3 steps)

1. **Download** this repository (click the green "Code" button → Download ZIP)

2. **Load in Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Turn on **Developer mode** (toggle in top-right)
   - Click **Load unpacked** and select the folder

3. **Enable file access** (important!):
   - Find **Markdown Viewer** in your extensions
   - Click **Details**
   - Enable **"Allow access to file URLs"**

That's it! 🎉

---

## How to Use

### View Markdown Files

Just drag any `.md` file into Chrome, or use File → Open to browse for one. The extension automatically takes over and renders it beautifully.

### Render Selected Text

See some markdown on a webpage? Select it and render it instantly:

1. **Highlight** any text on a webpage
2. **Click the Markdown Viewer icon** in the toolbar, or **right-click** and choose **"Render selection as Markdown"**
3. A new tab opens with the selected text rendered as beautiful markdown

This works on any webpage — great for previewing markdown in GitHub comments, READMEs, documentation, chat messages, or anywhere else.

### Toolbar Features

- **🌙/☀️** Toggle dark/light theme (your choice is saved)
- **{ }** View the raw markdown source
- **Filename** Always know which file you're viewing

### Code Blocks

Hover over any code block to see a **Copy** button appear. Click it to copy the code to your clipboard!

---

## What's Supported?

### Markdown Features

- **Text formatting**: **bold**, *italic*, ~~strikethrough~~
- **Headers**: All levels (H1-H6)
- **Lists**: Ordered, unordered, and nested
- **Links & Images**: External and relative paths
- **Tables**: With alignment support
- **Task lists**: `- [x]` and `- [ ]` become real checkboxes
- **Blockquotes**: Clean, styled quotes
- **Horizontal rules**: Visual separators
- **Inline & block code**: Syntax highlighted

### Programming Languages

Syntax highlighting works for:

JavaScript • TypeScript • JSX • TSX • Python • Go • Rust • Java • PHP • Ruby • Bash • JSON • YAML • SQL • CSS • Markdown

Missing your favorite language? It's easy to add more!

---

## Examples

### Before
```
# My Project
This is my **project** with some `code`...
```

### After
![Beautiful rendered markdown with styling, colors, and formatted code blocks]

---

## Privacy & Security

🔒 **100% Local** - All rendering happens in your browser
🚫 **No tracking** - Zero analytics, zero data collection
🌐 **No network requests** - Works completely offline
✅ **Open source** - Review the code yourself

Your files never leave your computer.

---

## Tips & Tricks

### Using Relative Paths

Images and links can use relative paths:

```markdown
![Logo](./assets/logo.png)
[Read more](./docs/guide.md)
```

Just make sure the paths are correct relative to your markdown file!

### Keyboard Shortcuts

While viewing a file:
- **Ctrl/Cmd + F**: Search in page
- **Ctrl/Cmd + +/-**: Zoom in/out
- **F5**: Reload if file changed on disk

---

## Customization

Want to tweak the colors or add more languages? All the code is in plain JavaScript and CSS:

- **Styling**: Edit `styles/viewer.css`
- **Code highlighting**: Modify `lib/prism.js`
- **Markdown parsing**: Configure `viewer.js`

After making changes, just click the reload button in `chrome://extensions/`.

---

## Troubleshooting

### Extension not working?

**Issue**: Markdown files still show as plain text
**Fix**: Make sure "Allow access to file URLs" is enabled (see Installation step 3)

**Issue**: Code blocks have no syntax highlighting
**Fix**: Specify the language in your markdown:
````markdown
```javascript
// your code here
```
````

**Issue**: Images don't load
**Fix**: Use absolute paths like `file:///full/path/to/image.png` or relative paths from the markdown file

### Still stuck?

Open an issue on GitHub and we'll help you out!

---

## Contributing

Found a bug? Want to add a feature? Contributions are welcome!

1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

Or just open an issue to discuss ideas!

---

## Built With

- [marked.js](https://marked.js.org/) - Fast markdown parser
- [Prism.js](https://prismjs.com/) - Lightweight syntax highlighter
- [GitHub Markdown CSS](https://github.com/sindresorhus/github-markdown-css) - GitHub's own markdown styling

---

## Authors

**Mathieu-Philippe Bourgeois** ([@matpb](https://github.com/matpb))
Developer, creator of Cortex AI

**Cortex** - AI assistant
Mathieu-Philippe's personal AI assistant, powered by Claude. Built to help with coding, automation, and creative projects.

---

## License

MIT License - Free to use, modify, and share!

See [LICENSE](LICENSE) file for details.

---

## Changelog

### v1.1.0 (2026-02-08)

- 🔍 Render selected text as markdown from any webpage
- 🖱️ Right-click context menu: "Render selection as Markdown"
- 🖼️ Clickable extension icon to render selected text
- 🛠️ Friendly instructions when no text is selected
- 🐛 Fixed table rendering contrast in light theme

### v1.0.0 (2026-02-06)

- 🎉 Initial release
- ✨ GitHub Flavored Markdown support
- 🎨 Syntax highlighting for 15+ languages
- 🌗 Dark/light theme toggle
- 📋 Copy buttons on code blocks
- ✅ Task list rendering
- 📄 Raw markdown view

---

**Made with ❤️ by humans and AI working together**

If this extension makes your life easier, give it a ⭐ on GitHub!
