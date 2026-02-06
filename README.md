# Markdown Viewer - Chrome Extension

A Chrome extension that renders Markdown files (`.md` and `.markdown`) as beautifully formatted HTML with GitHub Flavored Markdown support.

## Features

✨ **GitHub Flavored Markdown (GFM)** - Full support for tables, task lists, strikethrough, and more

🎨 **Syntax Highlighting** - Code blocks with Prism.js supporting 15+ languages:
- JavaScript, TypeScript, JSX, TSX
- Python, Go, Rust, Java, PHP, Ruby
- Bash, JSON, YAML, SQL, CSS, Markdown

🌗 **Dark/Light Theme** - Toggle between themes with theme persistence

📋 **Copy Code Blocks** - One-click copy buttons on all code blocks

✅ **Task Lists** - GitHub-style checkboxes for task items

📄 **Raw View** - Toggle between rendered and raw markdown

🎯 **Local Files** - View local `.md` files directly in Chrome

## Installation

### Step 1: Download the Extension

Clone or download this repository to your local machine:

```bash
git clone <repository-url>
cd markdown-viewer-extension
```

Or download the ZIP file and extract it.

### Step 2: Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`

2. Enable **Developer mode** (toggle in the top-right corner)

3. Click **Load unpacked**

4. Select the `markdown-viewer-extension` folder

5. The extension should now appear in your extensions list

### Step 3: Enable File Access (Critical!)

**This step is required for the extension to work with local files:**

1. In `chrome://extensions/`, find **Markdown Viewer**

2. Click **Details**

3. Scroll down to **Allow access to file URLs**

4. **Enable the toggle**

Without this permission, the extension cannot render local markdown files.

## Usage

### Opening Markdown Files

1. **Drag & Drop**: Drag a `.md` or `.markdown` file into Chrome

2. **File Menu**: Use `File > Open File...` (Ctrl/Cmd+O) and select a markdown file

3. **Address Bar**: Type `file:///path/to/your/file.md` in the address bar

The extension will automatically intercept and render the file as HTML.

### Toolbar Features

The toolbar at the top provides quick actions:

- **🌙/☀️ Button**: Toggle between dark and light themes (preference is saved)
- **{ } Button**: Toggle raw markdown view to see the original source
- **Filename**: Displays the current file name

### Keyboard Shortcuts

While viewing a markdown file:
- Scroll normally to read content
- Click links to navigate (external links open in new tabs)
- Use browser zoom (Ctrl/Cmd + +/-) to adjust text size

## Supported Markdown Features

### Basic Formatting

- **Bold**, *italic*, ~~strikethrough~~
- Headings (H1-H6)
- Lists (ordered and unordered)
- Blockquotes
- Horizontal rules
- Links and images

### Advanced Features

**Tables:**
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

**Task Lists:**
```markdown
- [x] Completed task
- [ ] Incomplete task
```

**Code Blocks:**
````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

**Inline Code:** Use `backticks` for inline code

### Syntax Highlighting Languages

The extension supports syntax highlighting for:

- JavaScript (`js`, `javascript`)
- TypeScript (`ts`, `typescript`)
- JSX (`jsx`)
- TSX (`tsx`)
- Python (`py`, `python`)
- Bash/Shell (`bash`, `sh`)
- JSON (`json`)
- YAML (`yaml`, `yml`)
- CSS (`css`)
- SQL (`sql`)
- Go (`go`)
- Rust (`rust`, `rs`)
- Java (`java`)
- PHP (`php`)
- Ruby (`ruby`, `rb`)
- Markdown (`markdown`, `md`)

## Customization

### Changing Themes

The extension includes both light and dark themes that match GitHub's styling. Your theme preference is saved in browser storage and persists across sessions.

### Modifying Styles

To customize the appearance, edit these files:

- `styles/viewer.css` - Main viewer styles and dark theme
- `styles/github-markdown.css` - GitHub markdown base styles
- `lib/prism.css` - Code syntax highlighting theme

### Adding More Languages

To add support for additional programming languages:

1. Download the Prism.js component from [cdnjs](https://cdnjs.com/libraries/prism)
2. Append it to `lib/prism.js`
3. Reload the extension

## Troubleshooting

### Extension Not Working

**Problem:** Markdown files still show as plain text

**Solutions:**
1. Verify "Allow access to file URLs" is enabled in `chrome://extensions/`
2. Make sure the file has `.md` or `.markdown` extension
3. Try reloading the extension (toggle it off and on)
4. Check the browser console (F12) for error messages

### Code Blocks Not Highlighting

**Problem:** Code blocks appear without syntax colors

**Solutions:**
1. Ensure you're specifying the language in the code fence: ` ```javascript `
2. Check that the language is in the supported list
3. Verify `lib/prism.js` and `lib/prism.css` exist

### Images Not Loading

**Problem:** Images in markdown don't display

**Solutions:**
- Use absolute file paths for local images: `![alt](file:///full/path/to/image.png)`
- Or use relative paths from the markdown file's location: `![alt](./images/photo.jpg)`
- For web images, use full URLs: `![alt](https://example.com/image.png)`

### Theme Not Persisting

**Problem:** Theme resets to light mode on each load

**Solution:** Ensure cookies/local storage isn't being cleared. The extension stores theme preference in `localStorage`.

## Technical Details

### Architecture

- **Manifest Version:** 3 (latest Chrome extension standard)
- **Content Script:** Intercepts markdown file loads at `document_start`
- **Viewer:** Iframe-based renderer with sandboxed environment
- **Libraries:**
  - [marked.js](https://marked.js.org/) v11.2.0 - Markdown parsing
  - [Prism.js](https://prismjs.com/) v1.29.0 - Syntax highlighting
  - [GitHub Markdown CSS](https://github.com/sindresorhus/github-markdown-css) v5.5.1 - Styling

### Privacy

- ✅ All rendering happens **locally** in your browser
- ✅ No data is sent to external servers
- ✅ No analytics or tracking
- ✅ No network requests (except for external images in your markdown)

### Performance

- Fast rendering for files up to 10MB
- Lazy loading for large documents
- Minimal memory footprint (~2-5MB)

## Development

### Project Structure

```
markdown-viewer-extension/
├── manifest.json           # Extension configuration
├── content.js             # Content script (intercepts .md files)
├── viewer.html            # Main viewer page
├── viewer.js              # Viewer logic and rendering
├── icon.svg               # Extension icon (SVG source)
├── icon16.png             # 16x16 icon
├── icon48.png             # 48x48 icon
├── icon128.png            # 128x128 icon
├── styles/
│   ├── github-markdown.css  # GitHub base styles
│   └── viewer.css          # Custom viewer styles
└── lib/
    ├── marked.min.js       # Markdown parser
    ├── marked-gfm-heading-id.min.js  # GFM heading IDs
    ├── prism.js            # Syntax highlighter (with languages)
    └── prism.css           # Prism theme
```

### Making Changes

After modifying any files:

1. Go to `chrome://extensions/`
2. Find **Markdown Viewer**
3. Click the **Reload** icon (circular arrow)
4. Test your changes with a markdown file

### Testing

Create a test markdown file with various features:

```bash
cat > test.md << 'EOF'
# Markdown Viewer Test

## Features Test

**Bold**, *italic*, ~~strikethrough~~

### Code Block

```javascript
const test = "Hello, World!";
console.log(test);
```

### Task List

- [x] Install extension
- [x] Enable file access
- [ ] Test all features

### Table

| Feature | Status |
|---------|--------|
| Syntax highlighting | ✅ |
| Dark theme | ✅ |
| Task lists | ✅ |

EOF
```

Then open `test.md` in Chrome and verify all features work.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - Feel free to use and modify as needed.

## Credits

Built with:
- [marked.js](https://github.com/markedjs/marked) - Markdown parser
- [Prism.js](https://github.com/PrismJS/prism) - Syntax highlighting
- [GitHub Markdown CSS](https://github.com/sindresorhus/github-markdown-css) - Styling

## Support

If you encounter issues:

1. Check the Troubleshooting section above
2. Open an issue on GitHub with:
   - Chrome version
   - Extension version
   - Steps to reproduce the problem
   - Error messages (if any)

---

**Enjoy reading markdown in style! 📝✨**
