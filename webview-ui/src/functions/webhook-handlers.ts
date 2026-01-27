import { vscode } from "../utils/vscode";

// TODO: Implementar integração com API AbacatePay

export function handleCreateWebhook() {
	console.log("Criar Webhook");
}

export function handleListWebhooks() {
	console.log("Listar Webhooks");
}

export function handleWebhookListen(forwardUrl: string) {
	vscode.postMessage({
		command: "run-terminal",
		payload: { command: "ls" },
	});
	console.log("Webhook listener iniciado para:", forwardUrl);
}
