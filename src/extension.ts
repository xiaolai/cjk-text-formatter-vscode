/**
 * CJK Text Formatter - VS Code Extension
 * Main extension entry point
 */

import * as vscode from 'vscode';
import { formatText, RuleConfig } from './formatter';
import { countWords, formatWordCount } from './wordCounter';

let statusBarItem: vscode.StatusBarItem;
let wordCountStatusBarItem: vscode.StatusBarItem;

/**
 * Read formatter configuration from VS Code settings
 */
function getFormatterConfig(): RuleConfig {
    const rulesConfig = vscode.workspace.getConfiguration('cjkFormatter.rules');
    const mainConfig = vscode.workspace.getConfiguration('cjkFormatter');

    return {
        ellipsisNormalization: rulesConfig.get('ellipsisNormalization', true),
        dashConversion: rulesConfig.get('dashConversion', true),
        emdashSpacing: rulesConfig.get('emdashSpacing', true),
        quoteSpacing: rulesConfig.get('quoteSpacing', true),
        singleQuoteSpacing: rulesConfig.get('singleQuoteSpacing', true),
        cjkEnglishSpacing: rulesConfig.get('cjkEnglishSpacing', true),
        fullwidthPunctuation: rulesConfig.get('fullwidthPunctuation', true),
        fullwidthParentheses: rulesConfig.get('fullwidthParentheses', true),
        fullwidthBrackets: rulesConfig.get('fullwidthBrackets', false),
        fullwidthAlphanumeric: rulesConfig.get('fullwidthAlphanumeric', true),
        currencySpacing: rulesConfig.get('currencySpacing', true),
        slashSpacing: rulesConfig.get('slashSpacing', true),
        spaceCollapsing: rulesConfig.get('spaceCollapsing', true),
        customRules: mainConfig.get('customRules', []),
    };
}

/**
 * Format the entire document
 */
async function formatDocument() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found');
        return;
    }

    const document = editor.document;
    const text = document.getText();

    try {
        const config = getFormatterConfig();
        const formatted = formatText(text, config);

        // Only apply edit if text actually changed
        if (formatted !== text) {
            const edit = new vscode.WorkspaceEdit();
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(text.length)
            );
            edit.replace(document.uri, fullRange, formatted);

            await vscode.workspace.applyEdit(edit);
            updateStatusBar('Formatted', true);

            // Clear status after 2 seconds
            setTimeout(() => {
                updateStatusBar('Ready');
            }, 2000);
        } else {
            updateStatusBar('No changes needed', true);
            setTimeout(() => {
                updateStatusBar('Ready');
            }, 2000);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`CJK Formatter Error: ${error}`);
        updateStatusBar('Error', false);
    }
}

/**
 * Format the selected text
 */
async function formatSelection() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found');
        return;
    }

    const selection = editor.selection;
    if (selection.isEmpty) {
        vscode.window.showInformationMessage('No text selected. Use "CJK: Format Document" to format entire document.');
        return;
    }

    const text = editor.document.getText(selection);

    try {
        const config = getFormatterConfig();
        const formatted = formatText(text, config);

        if (formatted !== text) {
            await editor.edit(editBuilder => {
                editBuilder.replace(selection, formatted);
            });
            updateStatusBar('Selection formatted', true);

            setTimeout(() => {
                updateStatusBar('Ready');
            }, 2000);
        } else {
            updateStatusBar('No changes needed', true);
            setTimeout(() => {
                updateStatusBar('Ready');
            }, 2000);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`CJK Formatter Error: ${error}`);
        updateStatusBar('Error', false);
    }
}

/**
 * Update status bar item
 */
function updateStatusBar(text: string, temporary = false) {
    if (!statusBarItem) {
        return;
    }

    statusBarItem.text = `$(edit) CJK: ${text}`;

    if (!temporary) {
        statusBarItem.tooltip = 'Click to format document';
        statusBarItem.command = 'cjk-formatter.formatDocument';
    } else {
        statusBarItem.tooltip = text;
    }

    statusBarItem.show();
}

/**
 * Handle format on save
 */
async function onWillSaveDocument(event: vscode.TextDocumentWillSaveEvent) {
    const config = vscode.workspace.getConfiguration('cjkFormatter');
    const formatOnSave = config.get('formatOnSave', false);

    if (!formatOnSave) {
        return;
    }

    // Only format supported languages
    const document = event.document;
    const supportedLanguages = ['markdown', 'plaintext', 'html'];

    if (!supportedLanguages.includes(document.languageId)) {
        return;
    }

    const text = document.getText();
    const formatterConfig = getFormatterConfig();
    const formatted = formatText(text, formatterConfig);

    if (formatted !== text) {
        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
        );
        edit.replace(document.uri, fullRange, formatted);

        event.waitUntil(vscode.workspace.applyEdit(edit));
    }
}

/**
 * Update word count status bar
 */
function updateWordCount() {
    const editor = vscode.window.activeTextEditor;

    // Hide word count if no editor or word count is disabled
    if (!wordCountStatusBarItem) {
        return;
    }

    if (!editor) {
        wordCountStatusBarItem.hide();
        return;
    }

    // Only show word count for markdown files
    if (editor.document.languageId !== 'markdown') {
        wordCountStatusBarItem.hide();
        return;
    }

    // Get configuration
    const config = vscode.workspace.getConfiguration('cjkFormatter.wordCount');
    const format = config.get<'total' | 'detailed'>('format', 'total');

    // Check if there's a selection
    const selection = editor.selection;
    let text: string;
    let isSelection = false;

    if (!selection.isEmpty) {
        text = editor.document.getText(selection);
        isSelection = true;
    } else {
        text = editor.document.getText();
    }

    // Count words
    const result = countWords(text);
    const displayText = formatWordCount(result, format);

    // Update status bar
    if (isSelection) {
        wordCountStatusBarItem.text = `$(symbol-string) Selection: ${result.total.toLocaleString()}`;
        wordCountStatusBarItem.tooltip = `Selection Word Count\n${displayText}\nCharacters: ${result.chars.toLocaleString()}`;
    } else {
        wordCountStatusBarItem.text = `$(symbol-string) ${displayText}`;
        wordCountStatusBarItem.tooltip = `Document Word Count\nCJK: ${result.cjk.toLocaleString()}\nEnglish: ${result.english.toLocaleString()}\nTotal: ${result.total.toLocaleString()}\nCharacters: ${result.chars.toLocaleString()}`;
    }

    wordCountStatusBarItem.show();
}

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('CJK Text Formatter is now active');

    // Create formatter status bar item
    const showStatusBar = vscode.workspace.getConfiguration('cjkFormatter').get('showStatusBar', true);
    if (showStatusBar) {
        statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );
        updateStatusBar('Ready');
        context.subscriptions.push(statusBarItem);
    }

    // Create word count status bar item
    const wordCountConfig = vscode.workspace.getConfiguration('cjkFormatter.wordCount');
    const wordCountEnabled = wordCountConfig.get('enabled', true);
    if (wordCountEnabled) {
        wordCountStatusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            99  // Position next to formatter status bar
        );
        context.subscriptions.push(wordCountStatusBarItem);

        // Update word count on editor change
        const editorChangeHandler = vscode.window.onDidChangeActiveTextEditor(() => {
            updateWordCount();
        });
        context.subscriptions.push(editorChangeHandler);

        // Update word count on document change
        const documentChangeHandler = vscode.workspace.onDidChangeTextDocument(event => {
            const editor = vscode.window.activeTextEditor;
            if (editor && event.document === editor.document) {
                updateWordCount();
            }
        });
        context.subscriptions.push(documentChangeHandler);

        // Update word count on selection change
        const selectionChangeHandler = vscode.window.onDidChangeTextEditorSelection(event => {
            const editor = vscode.window.activeTextEditor;
            if (editor && event.textEditor === editor) {
                updateWordCount();
            }
        });
        context.subscriptions.push(selectionChangeHandler);

        // Initial word count update
        updateWordCount();
    }

    // Register format document command
    const formatDocumentCommand = vscode.commands.registerCommand(
        'cjk-formatter.formatDocument',
        formatDocument
    );
    context.subscriptions.push(formatDocumentCommand);

    // Register format selection command
    const formatSelectionCommand = vscode.commands.registerCommand(
        'cjk-formatter.formatSelection',
        formatSelection
    );
    context.subscriptions.push(formatSelectionCommand);

    // Register format on save handler
    const willSaveHandler = vscode.workspace.onWillSaveTextDocument(onWillSaveDocument);
    context.subscriptions.push(willSaveHandler);

    // Listen to configuration changes
    const configChangeHandler = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('cjkFormatter.showStatusBar')) {
            const show = vscode.workspace.getConfiguration('cjkFormatter').get('showStatusBar', true);
            if (show && !statusBarItem) {
                statusBarItem = vscode.window.createStatusBarItem(
                    vscode.StatusBarAlignment.Right,
                    100
                );
                updateStatusBar('Ready');
                context.subscriptions.push(statusBarItem);
            } else if (!show && statusBarItem) {
                statusBarItem.dispose();
            }
        }

        if (event.affectsConfiguration('cjkFormatter.wordCount.enabled')) {
            const enabled = vscode.workspace.getConfiguration('cjkFormatter.wordCount').get('enabled', true);
            if (enabled && !wordCountStatusBarItem) {
                wordCountStatusBarItem = vscode.window.createStatusBarItem(
                    vscode.StatusBarAlignment.Right,
                    99
                );
                context.subscriptions.push(wordCountStatusBarItem);
                updateWordCount();
            } else if (!enabled && wordCountStatusBarItem) {
                wordCountStatusBarItem.dispose();
                wordCountStatusBarItem = undefined as any;
            }
        }

        if (event.affectsConfiguration('cjkFormatter.wordCount.format')) {
            updateWordCount();
        }
    });
    context.subscriptions.push(configChangeHandler);
}

/**
 * Extension deactivation
 */
export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
    if (wordCountStatusBarItem) {
        wordCountStatusBarItem.dispose();
    }
}
