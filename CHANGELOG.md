# Change Log

All notable changes to the "CJK Text Formatter" extension will be documented in this file.

## [1.0.3] - 2025-10-14

### Changed
- Renamed package from `cjk-formatter` to `cjk-text-formatter` for clarity and consistency
- Updated GitHub repository name from `cjk-formatter-vscode` to `cjk-text-formatter-vscode`
- Added VS Code Marketplace badge and direct installation link to README
- Enhanced installation section in README with marketplace URL

## [1.0.2] - 2025-10-13

### Fixed
- Fixed space collapsing to preserve markdown list indentation
- Replaced aggressive space collapsing pattern with sophisticated line-by-line processing
- List items with multiple levels of indentation (nested lists) now maintain proper structure
- Excessive spaces after list markers are normalized to single space
- Regular paragraph space collapsing still works correctly

## [1.0.1] - 2025-10-13

### Changed
- Enhanced documentation with comprehensive examples in all three CJK languages
- Added Japanese (日本語) formatting examples and test cases
- Added Korean (한국어) formatting examples and test cases
- Expanded README.md with multi-language examples showing before/after formatting
- Enhanced test-sample.md with detailed test cases for Chinese, Japanese, Korean, and mixed languages
- Updated rule descriptions table with examples from all three languages
- Added CJK language keywords (中文, 日本語, 한국어) to package.json for better discoverability
- Updated icon with transparent background for better theme compatibility

## [1.0.0] - 2025-10-13

### Added
- Initial release of CJK Text Formatter
- Complete port from Python cjk-text-formatter project
- Support for CJK (Chinese, Japanese, Korean) and English mixed text formatting
- 13 configurable formatting rules:
  - Ellipsis normalization
  - Dash conversion (-- to ——)
  - Em-dash spacing
  - Double quote spacing
  - Single quote spacing
  - CJK-English spacing
  - Full-width punctuation normalization
  - Full-width parentheses conversion
  - Full-width brackets conversion (optional)
  - Full-width alphanumeric to half-width conversion
  - Currency spacing fix
  - Slash spacing fix
  - Space collapsing
- Two commands:
  - Format Document (Cmd+Shift+F / Ctrl+Shift+F)
  - Format Selection
- Format on save option
- Status bar integration
- Support for Markdown, Plain Text, and HTML files
- Installation and testing scripts
