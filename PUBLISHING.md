# Publishing to VS Code Marketplace

## Current Status

✅ **GitHub Repository**: Published at https://github.com/xiaolai/cjk-formatter-vscode
✅ **Extension Packaged**: `cjk-formatter-1.0.1.vsix` created (28.74 KB, 10 files)
⏳ **Marketplace**: Needs publisher setup and Personal Access Token

## Steps to Publish

### 1. Create Azure DevOps Account

1. Go to https://dev.azure.com/
2. Sign in with your Microsoft account (or GitHub account)
3. Create an organization if you don't have one

### 2. Create Personal Access Token (PAT)

1. Go to https://dev.azure.com/
2. Click on your profile icon (top right) → **Personal access tokens**
3. Click **+ New Token**
4. Configure:
   - **Name**: `vscode-marketplace-xiaolai`
   - **Organization**: Select your organization (or "All accessible organizations")
   - **Expiration**: Choose duration (e.g., 90 days, 1 year, or custom)
   - **Scopes**: Click "Show all scopes" → Select **Marketplace (Manage)**
5. Click **Create**
6. **IMPORTANT**: Copy the token immediately (you won't see it again!)

### 3. Create Publisher (First Time Only)

```bash
cd /Users/joker/github/xiaolai/myprojects/cjk-formatter-vscode
vsce create-publisher xiaolai
```

You'll be prompted for:
- Personal Access Token (paste the token from step 2)
- Publisher name: `xiaolai`
- Display name: `Xiaolai Li` (or your preferred name)
- Description: Optional

### 4. Login to Publisher

```bash
vsce login xiaolai
```

Enter your Personal Access Token when prompted.

### 5. Publish Extension

```bash
vsce publish
```

Or publish with automatic version bump:
```bash
vsce publish patch  # 1.0.1 → 1.0.2
vsce publish minor  # 1.0.1 → 1.1.0
vsce publish major  # 1.0.1 → 2.0.0
```

## Alternative: Publish via Web UI

If you prefer to use the web interface:

1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with the same Microsoft account used for Azure DevOps
3. Click **+ New extension** → **Visual Studio Code**
4. Upload the `cjk-formatter-1.0.1.vsix` file
5. The extension will be published immediately

## Verification

After publishing, verify at:
- Marketplace: https://marketplace.visualstudio.com/items?itemName=xiaolai.cjk-formatter
- Install in VS Code: Search for "CJK Text Formatter" in Extensions

## Update Publisher in package.json (If Needed)

If you use a different publisher name, update `package.json`:

```json
{
  "publisher": "your-actual-publisher-name"
}
```

Then re-package and publish:
```bash
npm run package
vsce publish
```

## Current Package Details

- **Name**: cjk-formatter
- **Display Name**: CJK Text Formatter
- **Version**: 1.0.1
- **Publisher**: xiaolai (needs verification)
- **Package Size**: 28.74 KB
- **Files**: 10 files (no testing files included)
- **Repository**: https://github.com/xiaolai/cjk-formatter-vscode

## Troubleshooting

### "Personal Access Token verification failed"
- Make sure you created a token with **Marketplace (Manage)** scope
- Token must not be expired
- Run `vsce login xiaolai` and enter a fresh token

### "Publisher 'xiaolai' not found"
- Create publisher first: `vsce create-publisher xiaolai`
- Or use web UI to create publisher

### "Extension already exists"
- If someone else has published with this name, choose a different name
- Update `name` and `publisher` in `package.json`

## Post-Publication

After successful publication:

1. **Update README** with marketplace badge:
   ```markdown
   [![Version](https://img.shields.io/visual-studio-marketplace/v/xiaolai.cjk-formatter)](https://marketplace.visualstudio.com/items?itemName=xiaolai.cjk-formatter)
   ```

2. **Share the extension**:
   - Marketplace: https://marketplace.visualstudio.com/items?itemName=xiaolai.cjk-formatter
   - GitHub: https://github.com/xiaolai/cjk-formatter-vscode

3. **Monitor**:
   - Downloads: https://marketplace.visualstudio.com/manage/publishers/xiaolai
   - Issues: https://github.com/xiaolai/cjk-formatter-vscode/issues
   - Reviews: Marketplace page

## Publishing Updates

When you want to publish a new version:

1. Update code
2. Update version in `package.json`
3. Update `CHANGELOG.md`
4. Commit and push to GitHub
5. Compile and package: `npm run package`
6. Publish: `vsce publish`

The marketplace will automatically pull:
- README.md as the extension page
- CHANGELOG.md for version history
- Icon.png for the extension icon
