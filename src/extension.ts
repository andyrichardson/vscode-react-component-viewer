'use strict';
import * as vscode from 'vscode';

export function getFixtureName() {
  if (vscode.window.activeTextEditor === undefined) {
    vscode.window.showInformationMessage('Unable to determine editor file.');
    return false;
  }

  if (vscode.window.activeTextEditor.document.isUntitled) {
    vscode.window.showInformationMessage(
      'Files must be saved in order to preview.'
    );
    return false;
  }

  const filename = vscode.window.activeTextEditor.document.fileName;
  const extension = filename.match(/\.(tsx?|jsx?)$/);

  if (extension === null || extension.index === undefined) {
    vscode.window.showInformationMessage(
      'Supported file extensions are "ts, tsx, js, jsx".'
    );
    return false;
  }

  return (
    filename.slice(0, extension.index) +
    '.fixture' +
    filename.slice(extension.index)
  );
}

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('cosmos.showPreview', () => {
    const fixture = getFixtureName();
    if (!fixture) {
      return;
    }

    // const panel = vscode.window.createWebviewPanel(
    //   'CosmosPreview',
    //   'Component Preview',
    //   vscode.ViewColumn.Two,
    //   {
    //     enableScripts: true,
    //     localResourceRoots: {}
    //   }
    // );
  });
}

export function deactivate() {}
