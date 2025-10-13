# CJK Text Formatter

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/lixiaolai.cjk-text-formatter?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=lixiaolai.cjk-text-formatter)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/lixiaolai.cjk-text-formatter)](https://marketplace.visualstudio.com/items?itemName=lixiaolai.cjk-text-formatter)

A VS Code extension for formatting CJK (Chinese, Japanese, Korean) and English mixed text with proper typography rules.

## Features

- **Smart Spacing**: Automatically adds appropriate spaces between CJK and English/numbers
- **Punctuation Normalization**: Converts half-width punctuation to full-width in CJK context
- **Quote Handling**: Smart spacing around quotation marks with CJK punctuation awareness
- **Dash Conversion**: Converts `--` to `——` (em-dash) between CJK characters
- **Ellipsis Normalization**: Standardizes spaced ellipsis (`. . .`) to `...`
- **Full-width Character Handling**: Converts full-width alphanumeric to half-width
- **Bracket Normalization**: Converts `()` to `（）` in CJK context
- **Currency & Slash Spacing**: Removes unwanted spaces (`$ 100` → `$100`, `A / B` → `A/B`)
- **Format on Save**: Optional automatic formatting when saving files

## Usage

### Commands

- **CJK: Format Document** (`Cmd+Shift+F` on Mac, `Ctrl+Shift+F` on Windows/Linux)
  - Formats the entire document

- **CJK: Format Selection**
  - Formats only the selected text

### Format on Save

Enable automatic formatting on save in your settings:

```json
{
  "cjkFormatter.formatOnSave": true
}
```

## Configuration

All formatting rules can be toggled individually in VS Code settings:

```json
{
  "cjkFormatter.formatOnSave": false,
  "cjkFormatter.rules.ellipsisNormalization": true,
  "cjkFormatter.rules.dashConversion": true,
  "cjkFormatter.rules.emdashSpacing": true,
  "cjkFormatter.rules.quoteSpacing": true,
  "cjkFormatter.rules.singleQuoteSpacing": true,
  "cjkFormatter.rules.cjkEnglishSpacing": true,
  "cjkFormatter.rules.fullwidthPunctuation": true,
  "cjkFormatter.rules.fullwidthParentheses": true,
  "cjkFormatter.rules.fullwidthBrackets": false,
  "cjkFormatter.rules.fullwidthAlphanumeric": true,
  "cjkFormatter.rules.currencySpacing": true,
  "cjkFormatter.rules.slashSpacing": true,
  "cjkFormatter.rules.spaceCollapsing": true,
  "cjkFormatter.showStatusBar": true
}
```

### Rule Descriptions

| Rule | Description | Examples |
|------|-------------|----------|
| `ellipsisNormalization` | Convert spaced dots to standard ellipsis | `. . .` → `...` |
| `dashConversion` | Convert double dash to em-dash between CJK | `中文--English` → `中文 —— English`<br>`日本語--text` → `日本語 —— text`<br>`한국어--Korean` → `한국어 —— Korean` |
| `emdashSpacing` | Fix spacing around existing em-dashes | `中文——English` → `中文 —— English` |
| `quoteSpacing` | Add spaces around double quotes | `中文"text"English` → `中文 "text" English`<br>`日本語"text"です` → `日本語 "text" です` |
| `singleQuoteSpacing` | Add spaces around single quotes | `中文'text'English` → `中文 'text' English` |
| `cjkEnglishSpacing` | Add spaces between CJK and alphanumeric | `中文English123` → `中文 English123`<br>`日本語Text` → `日本語 Text`<br>`한국어ABC` → `한국어 ABC` |
| `fullwidthPunctuation` | Normalize punctuation width in CJK context | `中文,English` → `中文，English`<br>`日本語.text` → `日本語。text` |
| `fullwidthParentheses` | Convert parentheses in CJK context | `中文(括号)` → `中文（括号）`<br>`日本語(かっこ)` → `日本語（かっこ）` |
| `fullwidthBrackets` | Convert brackets in CJK context | `中文[括号]` → `中文【括号】`<br>`日本語[かっこ]` → `日本語【かっこ】` |
| `fullwidthAlphanumeric` | Convert full-width alphanumeric to half-width | `ＡＢＣ１２３` → `ABC123` |
| `currencySpacing` | Remove space between currency and amount | `$ 100` → `$100`<br>`¥ 100` → `¥100` |
| `slashSpacing` | Remove spaces around slashes | `A / B` → `A/B` |
| `spaceCollapsing` | Collapse multiple spaces to single space | `word  word` → `word word` |

## Examples

### Chinese (中文)

**Before Formatting:**
```text
这是一段中文English混合text，标点符号，也不规范。
价格是$ 100，比例是50/50。
. . . 省略号也不对。
"引号spacing"也有问题，中文(括号)需要转换。
全角字符ＡＢＣ１２３和数字100之间需要空格。
```

**After Formatting:**
```text
这是一段中文 English 混合 text，标点符号，也不规范。
价格是 $100，比例是 50/50。
... 省略号也不对。
"引号 spacing" 也有问题，中文（括号）需要转换。
全角字符 ABC123 和数字 100 之间需要空格。
```

### Japanese (日本語)

**Before Formatting:**
```text
日本語Englishの混合textです。価格は$ 100で、比率は50/50です。
全角文字ＡＢＣ１２３を使用しています。
"引用符spacing"の問題もあり、日本語(括弧)も変換が必要です。
数字100と日本語の間にはスペースが必要です。
```

**After Formatting:**
```text
日本語 English の混合 text です。価格は $100 で、比率は 50/50 です。
全角文字 ABC123 を使用しています。
"引用符 spacing" の問題もあり、日本語（括弧）も変換が必要です。
数字 100 と日本語の間にはスペースが必要です。
```

### Korean (한국어)

**Before Formatting:**
```text
한국어English혼합text입니다.가격은$ 100이고비율은50/50입니다.
전각문자ＡＢＣ１２３를사용하고있습니다.
"인용부호spacing"문제도있고,한국어(괄호)도변환이필요합니다.
숫자100와한국어사이에는공백이필요합니다.
```

**After Formatting:**
```text
한국어 English 혼합 text 입니다. 가격은 $100 이고 비율은 50/50 입니다.
전각문자 ABC123 를 사용하고 있습니다.
"인용부호 spacing" 문제도 있고, 한국어（괄호）도 변환이 필요합니다.
숫자 100 와 한국어 사이에는 공백이 필요합니다.
```

### Mixed Languages

**Before Formatting:**
```text
这是中文Chinese、これは日本語Japanese、이것은한국어Korean.
价格Price가격は$ 100.比例ratio비율는50/50です。
```

**After Formatting:**
```text
这是中文 Chinese、これは日本語 Japanese、이것은 한국어 Korean.
价格 Price 가격は $100. 比例 ratio 비율는 50/50 です。
```

## Supported Languages

- Markdown (`.md`)
- Plain Text (`.txt`)
- HTML (`.html`)

## Installation

### From VS Code Marketplace

**[Install directly from VS Code Marketplace →](https://marketplace.visualstudio.com/items?itemName=lixiaolai.cjk-text-formatter)**

Or install manually:

1. Open VS Code
2. Go to Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for "CJK Text Formatter"
4. Click Install

### From VSIX

1. Download the `.vsix` file
2. Open VS Code
3. Go to Extensions
4. Click "..." menu → Install from VSIX
5. Select the downloaded file

## Development

### Build from Source

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch mode for development
npm run watch

# Run linter
npm run lint

# Package extension
npm run package
```

### Local Testing

For local installation and testing (files in `testing/` directory):

```bash
# Quick install for testing
cd testing
./install-for-testing.sh

# Uninstall
./uninstall.sh

# See testing/TESTING.md for detailed testing guide
# See testing/test-sample.md for test examples
```

## Credits

Ported from the Python project [cjk-text-formatter](https://github.com/xiaolai/cjk-text-formatter) by Xiaolai Li.

## License

MIT

## Changelog

### 1.0.0

- Initial release
- Full port from Python cjk-text-formatter
- Support for 13 configurable formatting rules
- Format document and format selection commands
- Format on save option
- Status bar integration
