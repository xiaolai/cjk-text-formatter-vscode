/**
 * CJK Text Formatter - Core formatting logic
 * Ported from Python cjk-text-formatter project
 */

// CJK character ranges
const HAN = '\\u4e00-\\u9fff';              // Chinese characters + Japanese Kanji
const HIRAGANA = '\\u3040-\\u309f';         // Japanese Hiragana
const KATAKANA = '\\u30a0-\\u30ff';         // Japanese Katakana
const HANGUL = '\\uac00-\\ud7af';           // Korean Hangul

// Combined patterns
const CJK_ALL = `${HAN}${HIRAGANA}${KATAKANA}${HANGUL}`;
const CJK_NO_KOREAN = `${HAN}${HIRAGANA}${KATAKANA}`;

// CJK punctuation constants
const CJK_TERMINAL_PUNCTUATION = '，。！？；：、';
const CJK_CLOSING_BRACKETS = '》」』】）〉';
const CJK_OPENING_BRACKETS = '《「『【（〈';
const CJK_EM_DASH = '——';

// CJK characters pattern for dash conversion
const CJK_CHARS_PATTERN = `[${HAN}${HIRAGANA}${KATAKANA}《》「」『』【】（）〈〉，。！？；：、]`;

// Pre-compiled regex patterns
const CHINESE_RE = /[\u4e00-\u9fff]/;
const ELLIPSIS_PATTERN = /\s*\.\s+\.\s+\.(?:\s+\.)*/g;
const ELLIPSIS_SPACING_PATTERN = /\.\.\.\s*(?=\S)/g;
const CURRENCY_SPACING_PATTERN = /([$¥€£₹]|USD|CNY|EUR|GBP)\s+(\d)/g;
const SLASH_SPACING_PATTERN = /(?<![/:])\s*\/\s*(?!\/)/g;
const TRAILING_SPACE_PATTERN = / +$/gm;
const EXCESSIVE_NEWLINE_PATTERN = /\n{3,}/g;

// Rule configuration interface
export interface RuleConfig {
    ellipsisNormalization?: boolean;
    dashConversion?: boolean;
    emdashSpacing?: boolean;
    quoteSpacing?: boolean;
    singleQuoteSpacing?: boolean;
    cjkEnglishSpacing?: boolean;
    fullwidthPunctuation?: boolean;
    fullwidthParentheses?: boolean;
    fullwidthBrackets?: boolean;
    fullwidthAlphanumeric?: boolean;
    currencySpacing?: boolean;
    slashSpacing?: boolean;
    spaceCollapsing?: boolean;
}

/**
 * Check if text contains CJK characters (Han/Kanji)
 */
function containsCJK(text: string): boolean {
    return CHINESE_RE.test(text);
}

/**
 * Normalize spaced ellipsis patterns to standard ellipsis
 */
function normalizeEllipsis(text: string): string {
    // Replace spaced dots (. . . or . . . .) with standard ellipsis
    text = text.replace(ELLIPSIS_PATTERN, '...');
    // Ensure exactly one space after ellipsis when followed by non-whitespace
    text = text.replace(ELLIPSIS_SPACING_PATTERN, '... ');
    return text;
}

/**
 * Convert dashes (2+) to —— when between CJK characters
 */
function replaceDash(text: string): string {
    const dashPattern = new RegExp(
        `(${CJK_CHARS_PATTERN})\\s*-{2,}\\s*(${CJK_CHARS_PATTERN})`,
        'g'
    );

    return text.replace(dashPattern, (_match, before, after) => {
        // No space between closing quotes/parens and ——
        const leftSpace = (before === '）' || before === '》') ? '' : ' ';
        // No space between —— and opening quotes/parens
        const rightSpace = (after === '（' || after === '《') ? '' : ' ';
        return `${before}${leftSpace}——${rightSpace}${after}`;
    });
}

/**
 * Fix spacing around existing —— (em-dash) characters
 */
function fixEmdashSpacing(text: string): string {
    const emdashPattern = /([^\s])\s*——\s*([^\s])/g;

    return text.replace(emdashPattern, (_match, before, after) => {
        // No space between closing quotes/parens and ——
        const leftSpace = (before === '）' || before === '》') ? '' : ' ';
        // No space between —— and opening quotes/parens
        const rightSpace = (after === '（' || after === '《') ? '' : ' ';
        return `${before}${leftSpace}——${rightSpace}${after}`;
    });
}

/**
 * Fix spacing around quotation marks with smart CJK punctuation handling
 */
function fixQuoteSpacing(text: string, openingQuote: string, closingQuote: string): string {
    // All punctuation that should not have space before opening quote
    const noSpaceBefore = CJK_CLOSING_BRACKETS + CJK_TERMINAL_PUNCTUATION;
    // All punctuation that should not have space after closing quote
    const noSpaceAfter = CJK_OPENING_BRACKETS + CJK_TERMINAL_PUNCTUATION;

    // Add space before quote if preceded by alphanumeric/CJK/em-dash
    const beforePattern = new RegExp(
        `([A-Za-z0-9${CJK_ALL}${CJK_CLOSING_BRACKETS}${CJK_TERMINAL_PUNCTUATION}]|${CJK_EM_DASH})${openingQuote}`,
        'g'
    );

    text = text.replace(beforePattern, (_match, before) => {
        if (noSpaceBefore.includes(before) || before === CJK_EM_DASH) {
            return `${before}${openingQuote}`;
        }
        return `${before} ${openingQuote}`;
    });

    // Add space after quote if followed by alphanumeric/CJK/em-dash
    const afterPattern = new RegExp(
        `${closingQuote}([A-Za-z0-9${CJK_ALL}${CJK_OPENING_BRACKETS}${CJK_TERMINAL_PUNCTUATION}]|${CJK_EM_DASH})`,
        'g'
    );

    text = text.replace(afterPattern, (_match, after) => {
        if (noSpaceAfter.includes(after) || after === CJK_EM_DASH) {
            return `${closingQuote}${after}`;
        }
        return `${closingQuote} ${after}`;
    });

    return text;
}

/**
 * Fix spacing around double quotes ""
 */
function fixQuotes(text: string): string {
    // U+201C: " (LEFT DOUBLE QUOTATION MARK)
    // U+201D: " (RIGHT DOUBLE QUOTATION MARK)
    return fixQuoteSpacing(text, '\u201c', '\u201d');
}

/**
 * Fix spacing around single quotes ''
 */
function fixSingleQuotes(text: string): string {
    // U+2018: ' (LEFT SINGLE QUOTATION MARK)
    // U+2019: ' (RIGHT SINGLE QUOTATION MARK)
    return fixQuoteSpacing(text, '\u2018', '\u2019');
}

/**
 * Normalize punctuation width based on context
 */
function normalizeFullwidthPunctuation(text: string): string {
    const halfToFull: { [key: string]: string } = {
        ',': '，',
        '.': '。',
        '!': '！',
        '?': '？',
        ';': '；',
        ':': '：',
    };

    for (const [half, full] of Object.entries(halfToFull)) {
        // CJK + half + CJK → CJK + full + CJK
        const pattern1 = new RegExp(`([${CJK_NO_KOREAN}])\\${half}([${CJK_NO_KOREAN}])`, 'g');
        text = text.replace(pattern1, `$1${full}$2`);

        // CJK + half + end → CJK + full
        const pattern2 = new RegExp(`([${CJK_NO_KOREAN}])\\${half}(?=\\s|$)`, 'g');
        text = text.replace(pattern2, `$1${full}`);
    }

    return text;
}

/**
 * Normalize parentheses width in CJK context
 */
function normalizeFullwidthParentheses(text: string): string {
    const pattern = new RegExp(`\\(([${CJK_NO_KOREAN}][^()]*)\\)`, 'g');
    return text.replace(pattern, '（$1）');
}

/**
 * Normalize brackets width in CJK context
 */
function normalizeFullwidthBrackets(text: string): string {
    const pattern = new RegExp(`\\[([${CJK_NO_KOREAN}][^\\[\\]]*)\\]`, 'g');
    return text.replace(pattern, '【$1】');
}

/**
 * Convert full-width alphanumeric to half-width
 */
function normalizeFullwidthAlphanumeric(text: string): string {
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        // Full-width numbers (0-9): U+FF10-U+FF19
        if (code >= 0xFF10 && code <= 0xFF19) {
            return String.fromCharCode(code - 0xFEE0);
        }
        // Full-width uppercase (A-Z): U+FF21-U+FF3A
        if (code >= 0xFF21 && code <= 0xFF3A) {
            return String.fromCharCode(code - 0xFEE0);
        }
        // Full-width lowercase (a-z): U+FF41-U+FF5A
        if (code >= 0xFF41 && code <= 0xFF5A) {
            return String.fromCharCode(code - 0xFEE0);
        }
        return char;
    }).join('');
}

/**
 * Remove spaces between currency symbols and amounts
 */
function fixCurrencySpacing(text: string): string {
    return text.replace(CURRENCY_SPACING_PATTERN, '$1$2');
}

/**
 * Remove spaces around slashes
 */
function fixSlashSpacing(text: string): string {
    return text.replace(SLASH_SPACING_PATTERN, '/');
}

/**
 * Add spaces between CJK and English/numbers
 */
function spaceBetween(text: string): string {
    // Pattern for currency + numbers and alphanumeric with optional measurement units
    const alphanumPattern = '(?:[$¥€£₹][ ]?)?[A-Za-z0-9]+(?:[%‰℃℉]|°[CcFf]?|[ ]?(?:USD|CNY|EUR|GBP|RMB))?';

    // CJK followed by alphanumeric/currency
    const pattern1 = new RegExp(`([${CJK_ALL}])(${alphanumPattern})`, 'g');
    text = text.replace(pattern1, '$1 $2');

    // Alphanumeric/currency followed by CJK
    const pattern2 = new RegExp(`(${alphanumPattern})([${CJK_ALL}])`, 'g');
    text = text.replace(pattern2, '$1 $2');

    return text;
}

/**
 * Collapse multiple spaces while preserving markdown list indentation
 */
function collapseSpaces(text: string): string {
    const lines = text.split('\n');
    const processedLines = lines.map(line => {
        // Skip processing for lines that are list items or start with indentation
        // List markers: -, *, +, or numbers followed by . or )
        const listItemPattern = /^(\s*)([-*+]|\d+[.)])(\s+)(.*)$/;
        const match = line.match(listItemPattern);

        if (match) {
            const [, indent, marker, , content] = match;
            // Preserve indentation and marker with exactly one space, then collapse spaces in content
            const processedContent = content.replace(/(\S) {2,}/g, '$1 ');
            return indent + marker + ' ' + processedContent;
        }

        // For non-list lines, collapse multiple spaces but preserve leading indentation
        return line.replace(/(\S) {2,}/g, '$1 ');
    });

    return processedLines.join('\n');
}

/**
 * Main formatting function
 */
export function formatText(text: string, config?: RuleConfig): string {
    // Default: all rules enabled
    const rules: Required<RuleConfig> = {
        ellipsisNormalization: true,
        dashConversion: true,
        emdashSpacing: true,
        quoteSpacing: true,
        singleQuoteSpacing: true,
        cjkEnglishSpacing: true,
        fullwidthPunctuation: true,
        fullwidthParentheses: true,
        fullwidthBrackets: false, // Off by default
        fullwidthAlphanumeric: true,
        currencySpacing: true,
        slashSpacing: true,
        spaceCollapsing: true,
        ...config
    };

    // Universal normalization (applies to all languages)
    if (rules.ellipsisNormalization) {
        text = normalizeEllipsis(text);
    }

    // CJK-specific polishing (triggered by presence of Han characters)
    if (containsCJK(text)) {
        // Normalization rules (run first)
        if (rules.fullwidthAlphanumeric) {
            text = normalizeFullwidthAlphanumeric(text);
        }
        if (rules.fullwidthPunctuation) {
            text = normalizeFullwidthPunctuation(text);
        }
        if (rules.fullwidthParentheses) {
            text = normalizeFullwidthParentheses(text);
        }
        if (rules.fullwidthBrackets) {
            text = normalizeFullwidthBrackets(text);
        }

        // Em-dash and quote rules
        if (rules.dashConversion) {
            text = replaceDash(text);
        }
        if (rules.emdashSpacing) {
            text = fixEmdashSpacing(text);
        }
        if (rules.quoteSpacing) {
            text = fixQuotes(text);
        }
        if (rules.singleQuoteSpacing) {
            text = fixSingleQuotes(text);
        }

        // Spacing rules
        if (rules.cjkEnglishSpacing) {
            text = spaceBetween(text);
        }
        if (rules.currencySpacing) {
            text = fixCurrencySpacing(text);
        }
        if (rules.slashSpacing) {
            text = fixSlashSpacing(text);
        }

        // Cleanup rules
        if (rules.spaceCollapsing) {
            // Use the improved space collapsing function that preserves list indentation
            text = collapseSpaces(text);
        }

        // Remove trailing spaces at end of lines
        text = text.replace(TRAILING_SPACE_PATTERN, '');
    }

    // Collapse excessive newlines (3+) to max 2 (one blank line)
    text = text.replace(EXCESSIVE_NEWLINE_PATTERN, '\n\n');

    return text.trim();
}
