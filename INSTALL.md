# Installation & Development Guide

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- VS Code

### Setup Steps

1. **Clone or navigate to the project**
   ```bash
   cd /Users/joker/github/xiaolai/myprojects/cjk-formatter-vscode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile TypeScript**
   ```bash
   npm run compile
   ```

4. **Watch mode for development**
   ```bash
   npm run watch
   ```

### Quick Install for Testing (Recommended)

The easiest way to install the extension for testing:

```bash
cd /Users/joker/github/xiaolai/myprojects/cjk-formatter-vscode/testing
./install-for-testing.sh
```

This script will:
1. Install dependencies
2. Compile TypeScript
3. Package the extension
4. Install it in your VS Code

After installation:
- Restart VS Code
- Open `testing/test-sample.md` for example text
- Press `Cmd+Shift+F` to format

To uninstall:
```bash
cd testing
./uninstall.sh
```

### Testing the Extension (Development Mode)

For active development with hot reload:

1. Open the project in VS Code:
   ```bash
   code /Users/joker/github/xiaolai/myprojects/cjk-formatter-vscode
   ```

2. Press `F5` to launch Extension Development Host

3. In the new VS Code window:
   - Create or open a markdown file with CJK/English mixed text
   - Press `Cmd+Shift+F` (Mac) or `Ctrl+Shift+F` (Windows/Linux)
   - Or use Command Palette: `CJK: Format Document`

### Example Test Text

Create a file `test.md` with this content:

```markdown
这是一段中文English混合text，标点符号，也不规范。
价格是$ 100，比例是50/50。
. . . 省略号也不对。
"引号spacing"也有问题。
```

After formatting, it should become:

```markdown
这是一段中文 English 混合 text，标点符号，也不规范。
价格是 $100，比例是 50/50。
... 省略号也不对。
"引号 spacing" 也有问题。
```

## Publishing to VS Code Marketplace

### Prerequisites

1. Install `vsce` (Visual Studio Code Extension Manager):
   ```bash
   npm install -g @vscode/vsce
   ```

2. Create a [Personal Access Token](https://dev.azure.com/) on Azure DevOps:
   - Click on your profile → Security → Personal Access Tokens
   - Create a new token with `Marketplace (Manage)` scope
   - Copy the token (you won't see it again)

### Package the Extension

```bash
npm run package
```

This creates a `.vsix` file in the project root.

### Publish to Marketplace

1. **Create a publisher** (first time only):
   ```bash
   vsce create-publisher <your-publisher-name>
   ```

2. **Login**:
   ```bash
   vsce login <your-publisher-name>
   ```
   Enter your Personal Access Token when prompted.

3. **Publish**:
   ```bash
   vsce publish
   ```

   Or publish with version bump:
   ```bash
   vsce publish patch  # 1.0.0 → 1.0.1
   vsce publish minor  # 1.0.0 → 1.1.0
   vsce publish major  # 1.0.0 → 2.0.0
   ```

### Update Publisher in package.json

Before publishing, update the `publisher` field in `package.json` to match your publisher ID:

```json
{
  "publisher": "your-publisher-name"
}
```

## Manual Installation from VSIX

To install the extension manually:

1. **Package the extension**:
   ```bash
   npm run package
   ```

2. **Install in VS Code**:
   - Open VS Code
   - Go to Extensions view (`Cmd+Shift+X`)
   - Click `...` menu → `Install from VSIX...`
   - Select the generated `.vsix` file

Or via command line:
```bash
code --install-extension cjk-formatter-1.0.0.vsix
```

## Updating the Extension

1. Make your changes to the source code
2. Update version in `package.json`
3. Update `CHANGELOG.md`
4. Compile: `npm run compile`
5. Package: `npm run package`
6. Publish: `vsce publish`

## Troubleshooting

### Extension not activating

- Check that the file language is one of: markdown, plaintext, or html
- Open Developer Tools: `Cmd+Shift+P` → `Developer: Toggle Developer Tools`
- Check the Console for error messages

### Formatting not working

1. Check configuration: `Cmd+,` → Search for "CJK Formatter"
2. Verify rules are enabled
3. Test with the example text above

### Cannot publish

- Verify publisher name matches your Azure DevOps account
- Check Personal Access Token is valid and has correct scope
- Ensure version number is incremented

## Development Tips

- Use `npm run watch` to automatically recompile on changes
- Press `Cmd+R` (Mac) / `Ctrl+R` (Windows) in Extension Development Host to reload
- Check the Debug Console in main VS Code window for extension logs
- Use `console.log()` in TypeScript code for debugging (shows in Debug Console)

## File Structure

```
cjk-formatter-vscode/
├── src/
│   ├── extension.ts      # Main extension entry point
│   └── formatter.ts      # Core formatting logic
├── out/                  # Compiled JavaScript (generated)
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.json        # ESLint configuration
├── README.md             # User-facing documentation
├── CHANGELOG.md          # Version history
└── INSTALL.md            # This file
```
