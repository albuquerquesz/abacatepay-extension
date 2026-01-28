import * as vscode from "vscode";
import { apiService } from "../services/api-service";
import { getNonce } from "../utils/get-nonce";
import { getUri } from "../utils/get-uri";

export class SidebarProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = "abacatepay-view";
	private _view?: vscode.WebviewView;

	constructor(private readonly _extensionUri: vscode.Uri) {}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		_context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._extensionUri],
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(async (data) => {
			switch (data.command) {
				case "api-request": {
					try {
						const result = await apiService.request(data.endpoint, {
							method: data.method,
							body: data.body,
						});
						webviewView.webview.postMessage({
							command: "api-response",
							requestId: data.requestId,
							success: true,
							data: result,
						});
					} catch (error: any) {
						webviewView.webview.postMessage({
							command: "api-response",
							requestId: data.requestId,
							success: false,
							error: error.message || "Unknown error",
						});
					}
					break;
				}
				case "check-auth": {
					const config = vscode.workspace.getConfiguration("abacatepay");
					const apiKey = config.get("apiKey");

					webviewView.webview.postMessage({
						command: "auth-status",
						isAuthenticated: !!apiKey,
					});
					break;
				}
				case "login-google": {
					vscode.window.showInformationMessage(
						"Autenticando com AbacatePay...",
					);

					await vscode.workspace
						.getConfiguration("abacatepay")
						.update(
							"apiKey",
							"mock-key-123",
							vscode.ConfigurationTarget.Global,
						);

					webviewView.webview.postMessage({
						command: "auth-status",
						isAuthenticated: true,
					});
					break;
				}
				case "logout": {
					await vscode.workspace
						.getConfiguration("abacatepay")
						.update("apiKey", undefined, vscode.ConfigurationTarget.Global);
					webviewView.webview.postMessage({
						command: "auth-status",
						isAuthenticated: false,
					});
					vscode.window.showInformationMessage("Sessão encerrada.");
					break;
				}
				case "showInfo": {
					vscode.window.showInformationMessage(data.data);
					break;
				}
				case "showError": {
					vscode.window.showErrorMessage(data.data);
					break;
				}
				case "run-terminal": {
					let terminal = vscode.window.terminals.find(
						(t) => t.name === "AbacatePay",
					);
					if (!terminal) {
						terminal = vscode.window.createTerminal("AbacatePay");
					}
					terminal.show();
					terminal.sendText(data.payload.command);
					break;
				}
			}
		});
	}

	public revive(panel: vscode.WebviewView) {
		this._view = panel;
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		const stylesUri = getUri(webview, this._extensionUri, [
			"webview-ui",
			"dist",
			"assets",
			"index.css",
		]);
		const scriptUri = getUri(webview, this._extensionUri, [
			"webview-ui",
			"dist",
			"assets",
			"index.js",
		]);

		const nonce = getNonce();

		return /*html*/ `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; font-src ${webview.cspSource}; img-src ${webview.cspSource} https:; connect-src https:;">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>AbacatePay</title>
        </head>
        <body style="padding: 0;">
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
	}
}
