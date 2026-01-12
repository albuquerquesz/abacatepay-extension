import * as vscode from "vscode";
import { AbacatePayPanel } from "./panels/AbacatePayPanel";

export function activate(context: vscode.ExtensionContext) {
	const showPanelCommand = vscode.commands.registerCommand(
		"abacatepay.showPanel",
		() => {
			AbacatePayPanel.render(context.extensionUri);
		},
	);

	context.subscriptions.push(showPanelCommand);
}

export function deactivate() {}
