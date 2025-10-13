# CJK Text Formatter

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/lixiaolai.cjk-text-formatter?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=lixiaolai.cjk-text-formatter)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/lixiaolai.cjk-text-formatter)](https://marketplace.visualstudio.com/items?itemName=lixiaolai.cjk-text-formatter)

Format CJK (Chinese, Japanese, Korean) and English mixed text with proper typography rules. Includes word counter for markdown files and custom rule support.

## Quick Start

**Commands:**
- `Cmd/Ctrl+Shift+F` - Format Document
- Command Palette → `CJK: Format Selection`

**Word Count** (markdown only):
- Shows in status bar automatically
- Includes CJK characters + English words + numbers
- Displays selection count when text is selected

## Features

### Core Formatting

| Feature | Example |
|---------|---------|
| **CJK-English Spacing** | `中文English` → `中文 English` |
| **Punctuation Width** | `中文,text` → `中文，text` |
| **Quote Spacing** | `中文"text"` → `中文 "text"` |
| **Em-dash** | `中文--English` → `中文 —— English` |
| **Ellipsis** | `. . .` → `...` |
| **Parentheses** | `中文(text)` → `中文（text）` |
| **Fullwidth → Halfwidth** | `ＡＢＣ１２３` → `ABC123` |
| **Currency** | `$ 100` → `$100` |
| **Slashes** | `A / B` → `A/B` |

### Word Count (Markdown Only)

- **CJK**: Each character = 1 word
- **English**: Space-separated words (includes numbers)
- **Smart**: Strips markdown formatting (code blocks, headings, etc.)
- **Display**: Status bar shows `Words: 1,234` or detailed breakdown
- **Selection**: Shows count for selected text

### Custom Rules

Add your own regex patterns via IntelliSense or settings:

```json
{
  "cjkFormatter.customRules": [
    {
      "name": "right_arrow",
      "pattern": "\\s*->\\s*",
      "replacement": " → "
    }
  ]
}
```

**Built-in examples** (press `Ctrl+Space` in settings):
- Unicode arrows (→, ←, ↔)
- Multiplication sign (×)
- Fractions (½, ⅓, ¼)
- Temperature symbols (°C, °F)

## Configuration

### Supported File Types

Default: `markdown`, `plaintext`, `restructuredtext`

```json
{
  "cjkFormatter.supportedLanguages": ["markdown", "plaintext", "restructuredtext"]
}
```

Add `html`, `latex`, or `asciidoc` if needed. Status bar and format-on-save only work for selected types.

### Word Count

```json
{
  "cjkFormatter.wordCount.enabled": true,
  "cjkFormatter.wordCount.format": "total"  // or "detailed"
}
```

### Format on Save

```json
{
  "cjkFormatter.formatOnSave": true
}
```

### Toggle Rules

All 13 formatting rules can be enabled/disabled:

```json
{
  "cjkFormatter.rules.cjkEnglishSpacing": true,
  "cjkFormatter.rules.fullwidthPunctuation": true,
  "cjkFormatter.rules.quoteSpacing": true,
  // ... see Settings UI for full list
}
```

## Examples

### Chinese
```text
Before: 这是中文English混合text，价格$ 100
After:  这是中文 English 混合 text，价格 $100
```

### Japanese
```text
Before: 日本語Englishの混合textです
After:  日本語 English の混合 text です
```

### Korean
```text
Before: 한국어English혼합text입니다
After:  한국어 English 혼합 text 입니다
```

## Installation

**[Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=lixiaolai.cjk-text-formatter)**

Or: Extensions → Search "CJK Text Formatter" → Install

## Credits

Ported from [cjk-text-formatter](https://github.com/xiaolai/cjk-text-formatter) by Xiaolai Li.

## License

MIT
