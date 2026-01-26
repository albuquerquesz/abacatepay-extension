import * as vscode from "vscode";
import { Panel } from "./panels/panel";

export function activate(context: vscode.ExtensionContext) {
	const showPanelCommand = vscode.commands.registerCommand(
		"abacatepay.showPanel",
		() => {
			Panel.render(context.extensionUri);
		},
	);

	context.subscriptions.push(showPanelCommand);
}

export function deactivate() {}
