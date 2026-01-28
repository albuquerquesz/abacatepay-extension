import { vscode } from "../utils/vscode";

// TODO: Implementar integração com API AbacatePay

export function handleCreateWebhook(url: string) {
	console.log("Criar Webhook em:", url);
}

export function handleListWebhooks() {
	console.log("Listar Webhooks");
}

export function handleWebhookListen(url: string) {
	console.log("Escutar Webhooks em:", url);
}

export function handleResendEvent(eventId: string) {
	console.log("Reenviando evento:", eventId);
	vscode.postMessage({
		command: "run-terminal",
		payload: {
			command: `abacate resend ${eventId}`,
		},
	});
}
