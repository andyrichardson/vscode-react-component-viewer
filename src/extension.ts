'use strict';
import * as vscode from 'vscode';
import fetch from 'cross-fetch';

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

const startCosmos = async () => {
  try {
    await fetch('http://localhost:8989');
    return true;
  } catch (err) {}

  if (require.main === undefined) {
    vscode.window.showErrorMessage('Unable to import');
    return false;
  }

  const projectPath = vscode.workspace.rootPath;

  if (projectPath === undefined) {
    vscode.window.showErrorMessage('Unable to determine project root.');
    return false;
  }

  process.chdir(projectPath);
  try {
    require(`${
      vscode.workspace.rootPath
    }/node_modules/react-cosmos/bin/cosmos`);
  } catch (err) {
    vscode.window.showErrorMessage('Unable to start cosmos.', err);
    return false;
  }

  return true;
};

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('cosmos.showPreview', async () => {
    const hasStarted = await startCosmos();

    if (!hasStarted) {
      return;
    }
  });
}

export function deactivate() {}
