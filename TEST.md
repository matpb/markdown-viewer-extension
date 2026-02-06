# Markdown Viewer Test Document

This document tests all major features of the Markdown Viewer extension.

## Table of Contents

- [Basic Formatting](#basic-formatting)
- [Code Blocks](#code-blocks)
- [Lists](#lists)
- [Tables](#tables)
- [Task Lists](#task-lists)
- [Links and Images](#links-and-images)
- [Blockquotes](#blockquotes)

---

## Basic Formatting

This is a paragraph with **bold text**, *italic text*, and ~~strikethrough text~~.

You can also combine them: ***bold and italic***, **_bold and italic_**, ~~**bold strikethrough**~~.

### Inline Code

Here's some inline code: `const greeting = "Hello, World!";`

---

## Code Blocks

### JavaScript

```javascript
// JavaScript example
const greeting = "Hello, World!";
console.log(greeting);

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
```

### TypeScript

```typescript
// TypeScript example
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};

function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}
```

### Python

```python
# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(10):
    print(f"fibonacci({i}) = {fibonacci(i)}")
```

### Bash

```bash
#!/bin/bash
# Bash script example

echo "Hello, World!"

for i in {1..10}; do
  echo "Count: $i"
done
```

### JSON

```json
{
  "name": "markdown-viewer-extension",
  "version": "1.0.0",
  "description": "Chrome extension for viewing markdown files",
  "features": [
    "Syntax highlighting",
    "Dark theme",
    "Task lists"
  ]
}
```

### YAML

```yaml
# YAML example
name: markdown-viewer-extension
version: 1.0.0
features:
  - Syntax highlighting
  - Dark theme
  - Task lists
dependencies:
  marked: ^11.2.0
  prismjs: ^1.29.0
```

---

## Lists

### Unordered List

- First item
- Second item
  - Nested item 1
  - Nested item 2
    - Deeply nested item
- Third item

### Ordered List

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

---

## Tables

### Simple Table

| Feature | Status | Priority |
|---------|--------|----------|
| Syntax highlighting | ✅ Complete | High |
| Dark theme | ✅ Complete | Medium |
| Task lists | ✅ Complete | Medium |
| Image zoom | ❌ Not started | Low |

### Alignment

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Text | Text | Text |
| More | More | More |
| Data | Data | Data |

---

## Task Lists

### Project Tasks

- [x] Research Chrome extension APIs
- [x] Implement markdown parsing
- [x] Add syntax highlighting
- [x] Create dark theme
- [ ] Add image zoom feature
- [ ] Support mermaid diagrams
- [ ] Add export to PDF

### Daily Tasks

- [x] Morning standup
- [x] Code review
- [ ] Write documentation
- [ ] Deploy to production

---

## Links and Images

### Links

[Google](https://www.google.com)

[GitHub](https://github.com)

[Relative link to README](./README.md)

### Reference Links

Here's a link to [Google][1] and another to [GitHub][2].

[1]: https://www.google.com
[2]: https://github.com

---

## Blockquotes

> This is a simple blockquote.
> It can span multiple lines.

> **Note:** This is an important note.
>
> You can include formatting inside blockquotes.

> ### Nested Quote
>
> > This is a nested blockquote.
> > It's indented further.

---

## Horizontal Rules

Above the line

---

Below the line

***

Another style

___

Yet another style

---

## Headers

# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

---

## Special Characters

Escaping special characters: \* \_ \` \[ \] \( \) \#

Automatic URLs: https://www.example.com

Email: test@example.com

---

## Math (if supported)

Inline math: $E = mc^2$

Block math:

$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

---

## Emoji (if supported)

:smile: :rocket: :heart: :star: :fire:

---

## HTML Support

<details>
<summary>Click to expand</summary>

This is hidden content that can be toggled.

```javascript
console.log("Hidden code block");
```

</details>

---

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

---

## Definition Lists

Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b

---

## End of Test Document

If you can see all the features above properly formatted, the extension is working correctly! 🎉

**Test checklist:**
- [x] Basic formatting renders correctly
- [x] Code blocks have syntax highlighting
- [x] Tables are properly formatted
- [x] Task lists show checkboxes
- [x] Links are clickable
- [x] Blockquotes are styled
- [x] Headers have proper hierarchy
- [x] Dark theme toggle works
- [x] Raw view toggle works
- [x] Copy buttons appear on code blocks
