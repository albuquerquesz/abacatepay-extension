import * as vscode from "vscode";
import { getNonce } from "../utils/get-nonce";
import { getUri } from "../utils/get-uri";

export class Panel {
	public static currentPanel: Panel | undefined;
	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;

		this._panel.webview.html = this._getWebviewContent(this._panel.webview);

		this._setWebviewMessageListener(this._panel.webview);

		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
	}

	public static render(extensionUri: vscode.Uri) {
		if (Panel.currentPanel) {
			Panel.currentPanel._panel.reveal(vscode.ViewColumn.One);
			return;
		}

		const panel = vscode.window.createWebviewPanel(
			"abacatepay",
			"AbacatePay",
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
				localResourceRoots: [
					vscode.Uri.joinPath(extensionUri, "out"),
					vscode.Uri.joinPath(extensionUri, "webview-ui", "dist"),
				],
			},
		);

		Panel.currentPanel = new Panel(panel, extensionUri);
	}

	public dispose() {
		Panel.currentPanel = undefined;

		this._panel.dispose();

		while (this._disposables.length) {
			const disposable = this._disposables.pop();
			if (!disposable) continue;
			disposable.dispose();
		}
	}

	private _getWebviewContent(webview: vscode.Webview): string {
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
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; font-src ${webview.cspSource}; img-src ${webview.cspSource} https:; connect-src https:; worker-src 'none';">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>AbacatePay</title>
        </head>
        <body>
          <div id="root"></div>
          <script nonce="${nonce}">
            if ('serviceWorker' in navigator) {
              Object.defineProperty(navigator, 'serviceWorker', {
                get: function() { return undefined; }
              });
            }
          </script>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
	}

	private _setWebviewMessageListener(webview: vscode.Webview) {
		webview.onDidReceiveMessage(
			async (message: any) => {
				const { command, data } = message;

				switch (command) {
					case "check-auth": {
						const config = vscode.workspace.getConfiguration('abacatepay');
						const apiKey = config.get('apiKey');
						webview.postMessage({ 
							command: "auth-status", 
							isAuthenticated: !!apiKey 
						});
						break;
					}
					case "login-google": {
						vscode.window.showInformationMessage("Autenticando com AbacatePay...");
						await vscode.workspace.getConfiguration('abacatepay').update('apiKey', 'mock-key-123', vscode.ConfigurationTarget.Global);
						webview.postMessage({ 
							command: "auth-status", 
							isAuthenticated: true 
						});
						break;
					}
					case "showInfo":
						vscode.window.showInformationMessage(data as string);
						break;
					case "run-terminal": {
						const terminal = vscode.window.createTerminal("AbacatePay Webhooks");
						terminal.show();
						terminal.sendText(message.payload.command);
						break;
					}
					default:
						break;
				}
			},
			undefined,
			this._disposables,
		);
	}

	public postMessage(message: unknown) {
		this._panel.webview.postMessage(message);
	}
}
