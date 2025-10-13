/**
 * CJK Text Formatter - VS Code Extension
 * Main extension entry point
 */

import * as vscode from 'vscode';
import { formatText, RuleConfig } from './formatter';

let statusBarItem: vscode.StatusBarItem;

/**
 * Read formatter configuration from VS Code settings
 */
function getFormatterConfig(): RuleConfig {
    const config = vscode.workspace.getConfiguration('cjkFormatter.rules');

    return {
        ellipsisNormalization: config.get('ellipsisNormalization', true),
        dashConversion: config.get('dashConversion', true),
        emdashSpacing: config.get('emdashSpacing', true),
        quoteSpacing: config.get('quoteSpacing', true),
        singleQuoteSpacing: config.get('singleQuoteSpacing', true),
        cjkEnglishSpacing: config.get('cjkEnglishSpacing', true),
        fullwidthPunctuation: config.get('fullwidthPunctuation', true),
        fullwidthParentheses: config.get('fullwidthParentheses', true),
        fullwidthBrackets: config.get('fullwidthBrackets', false),
        fullwidthAlphanumeric: config.get('fullwidthAlphanumeric', true),
        currencySpacing: config.get('currencySpacing', true),
        slashSpacing: config.get('slashSpacing', true),
        spaceCollapsing: config.get('spaceCollapsing', true),
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
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('CJK Text Formatter is now active');

    // Create status bar item
    const showStatusBar = vscode.workspace.getConfiguration('cjkFormatter').get('showStatusBar', true);
    if (showStatusBar) {
        statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );
        updateStatusBar('Ready');
        context.subscriptions.push(statusBarItem);
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
}
