import * as vscode from "vscode";
import { Panel } from "./panels/panel";
import { SidebarProvider } from "./panels/sidebar-provider";

export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			SidebarProvider.viewType,
			sidebarProvider,
		),
	);

	const showPanelCommand = vscode.commands.registerCommand(
		"abacatepay.showPanel",
		() => {
			Panel.render(context.extensionUri);
		},
	);

	context.subscriptions.push(showPanelCommand);
}

export function deactivate() {}
