# Workspace Settings

This directory contains workspace-specific VS Code settings for the CJK Text Formatter project.

## `.vscode/settings.json`

This file contains **example custom formatting rules** with comprehensive comments. It serves as:

1. **Documentation** - Shows users what's possible with custom rules
2. **Quick Reference** - Easy copy-paste examples for common use cases  
3. **Testing Template** - Developers can uncomment examples to test features

### For Extension Users

When users install this extension, they should create their own settings file:

**User Settings** (global):
- Mac: `~/Library/Application Support/Code/User/settings.json`
- Windows: `%APPDATA%\Code\User\settings.json`
- Linux: `~/.config/Code/User/settings.json`

**Workspace Settings** (project-specific):
- Create `.vscode/settings.json` in their project root

### IntelliSense Support

When users edit `cjkFormatter.customRules` in their settings.json file, they will get **automatic completion suggestions** with these example rules, thanks to the `defaultSnippets` in `package.json`.

#### How to Use IntelliSense:

1. Open settings: `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)
2. Click "Open Settings (JSON)" in top right
3. Start typing `"cjkFormatter.customRules": [`
4. Inside the array, press `Ctrl+Space` to see snippet suggestions
5. Select an example rule and it will be auto-inserted

### Example Rules Included

- **Unicode Arrows**: `->` to `→`, `<-` to `←`, `<->` to `↔`
- **Multiplication Sign**: `10 x 20` to `10×20`
- **Fractions**: `1/2` to `½`, `1/3` to `⅓`, `1/4` to `¼`
- **Temperature**: `25 C` to `25°C`, `77 F` to `77°F`
- **Mathematical Symbols**: `>=` to `≥`, `<=` to `≤`, `!=` to `≠`

### Testing Custom Rules

Use the test files in `testing/` directory:
- `testing/custom-rules-test.md` - Comprehensive test cases
- `testing/test-custom-input.md` - Quick testing

### Note

This workspace settings file is committed to the repository for **documentation purposes**. Users of the extension will have their own settings files and won't see this one unless they're developing the extension itself.
