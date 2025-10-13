/**
 * Word Counter for Markdown Files
 * Counts words in CJK/English mixed text, excluding markdown formatting
 */

// CJK character ranges (reused from formatter.ts)
const HAN = '\\u4e00-\\u9fff';              // Chinese characters + Japanese Kanji
const HIRAGANA = '\\u3040-\\u309f';         // Japanese Hiragana
const KATAKANA = '\\u30a0-\\u30ff';         // Japanese Katakana
const HANGUL = '\\uac00-\\ud7af';           // Korean Hangul
const CJK_ALL = `${HAN}${HIRAGANA}${KATAKANA}${HANGUL}`;

// Regex patterns
const CJK_PATTERN = new RegExp(`[${CJK_ALL}]`, 'g');
const ALPHANUMERIC_PATTERN = /\b[A-Za-z0-9]+\b/g;

export interface WordCountResult {
    cjk: number;        // CJK character count
    english: number;    // English/alphanumeric word count
    total: number;      // Total word count
    chars: number;      // Total character count (excluding spaces)
}

/**
 * Strip markdown formatting syntax from text
 * This removes formatting while preserving the actual content
 */
function stripMarkdown(text: string): string {
    let stripped = text;

    // Remove code blocks (fenced and indented)
    stripped = stripped.replace(/```[\s\S]*?```/g, '');        // Fenced code blocks
    stripped = stripped.replace(/~~~[\s\S]*?~~~/g, '');        // Alternative fenced code blocks
    stripped = stripped.replace(/^(?: {4}|\t).+$/gm, '');      // Indented code blocks

    // Remove inline code
    stripped = stripped.replace(/`[^`\n]+`/g, '');

    // Remove HTML comments
    stripped = stripped.replace(/<!--[\s\S]*?-->/g, '');

    // Remove YAML front matter
    stripped = stripped.replace(/^---[\s\S]*?---/m, '');

    // Remove horizontal rules
    stripped = stripped.replace(/^(?:[-*_]){3,}$/gm, '');

    // Remove headers (keep the text, remove the # symbols)
    stripped = stripped.replace(/^#{1,6}\s+/gm, '');

    // Remove blockquote markers (keep the text)
    stripped = stripped.replace(/^>\s+/gm, '');

    // Remove list markers (keep the text)
    stripped = stripped.replace(/^[\s]*[-*+]\s+/gm, '');       // Unordered lists
    stripped = stripped.replace(/^[\s]*\d+\.\s+/gm, '');       // Ordered lists

    // Remove links but keep link text: [text](url) -> text
    stripped = stripped.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // Remove reference-style links: [text][ref] -> text
    stripped = stripped.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1');

    // Remove link references: [ref]: url
    stripped = stripped.replace(/^\[[^\]]+\]:\s+.+$/gm, '');

    // Remove images: ![alt](url) -> (remove completely)
    stripped = stripped.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

    // Remove bold: **text** or __text__ -> text
    stripped = stripped.replace(/\*\*([^*]+)\*\*/g, '$1');
    stripped = stripped.replace(/__([^_]+)__/g, '$1');

    // Remove italic: *text* or _text_ -> text
    stripped = stripped.replace(/\*([^*]+)\*/g, '$1');
    stripped = stripped.replace(/_([^_]+)_/g, '$1');

    // Remove strikethrough: ~~text~~ -> text
    stripped = stripped.replace(/~~([^~]+)~~/g, '$1');

    // Remove HTML tags
    stripped = stripped.replace(/<[^>]+>/g, '');

    // Remove footnotes: [^1] or [^note]
    stripped = stripped.replace(/\[\^[^\]]+\]/g, '');

    // Remove task list markers: - [ ] or - [x]
    stripped = stripped.replace(/^[\s]*-\s+\[[x ]\]\s+/gmi, '');

    // Remove tables (simple approach - remove entire table structure)
    stripped = stripped.replace(/^\|.+\|$/gm, '');
    stripped = stripped.replace(/^\|?[\s]*:?-+:?[\s]*\|.*$/gm, '');

    // Remove remaining isolated markdown symbols
    stripped = stripped.replace(/[*_~`#]/g, '');

    return stripped;
}

/**
 * Count CJK characters in text
 */
function countCJKCharacters(text: string): number {
    const matches = text.match(CJK_PATTERN);
    return matches ? matches.length : 0;
}

/**
 * Count English/alphanumeric words (including numbers)
 */
function countAlphanumericWords(text: string): number {
    const matches = text.match(ALPHANUMERIC_PATTERN);
    return matches ? matches.length : 0;
}

/**
 * Count total characters excluding whitespace
 */
function countCharacters(text: string): number {
    return text.replace(/\s/g, '').length;
}

/**
 * Main word counting function for markdown text
 * Strips markdown formatting and counts CJK characters + English words
 */
export function countWords(text: string): WordCountResult {
    // Strip markdown formatting first
    const plainText = stripMarkdown(text);

    // Count different types
    const cjkCount = countCJKCharacters(plainText);
    const englishCount = countAlphanumericWords(plainText);
    const totalCount = cjkCount + englishCount;
    const charCount = countCharacters(plainText);

    return {
        cjk: cjkCount,
        english: englishCount,
        total: totalCount,
        chars: charCount
    };
}

/**
 * Format word count for display
 */
export function formatWordCount(result: WordCountResult, format: 'total' | 'detailed' = 'total'): string {
    if (format === 'detailed') {
        return `CJK: ${result.cjk.toLocaleString()} | EN: ${result.english.toLocaleString()} | Total: ${result.total.toLocaleString()}`;
    }
    return `Words: ${result.total.toLocaleString()}`;
}
