import { vscode } from "../utils/vscode";

export function handleCreateWebhook(url: string) {
	console.log("Criar Webhook em:", url);
}

export function handleListWebhooks() {
	console.log("Listar Webhooks");
}

export function handleWebhookListen(url: string) {
	console.log("Escutar Webhooks em:", url);
	vscode.postMessage({
		command: "run-terminal",
		payload: {
			command: `abacate listen --forward-to ${url}`,
		},
	});
}

export function handleResendEvent(eventId: string) {
	console.log("Reenviando evento:", eventId);
	vscode.postMessage({
		command: "run-terminal",
		payload: {
			command: `abacate events resend ${eventId}`,
		},
	});
}

export function handleListLogs(limit?: string, format?: string) {
	let command = "abacate logs list";
	if (limit && limit.trim() !== "") command += ` --limit ${limit}`;
	if (format && format.trim() !== "") command += ` --o ${format}`;

	vscode.postMessage({
		command: "run-terminal",
		payload: {
			command,
		},
	});
}

export function handleTriggerEvent(event: string) {
	console.log("Trigando evento:", event);
	vscode.postMessage({
		command: "run-terminal",
		payload: {
			command: `abacate trigger ${event}`,
		},
	});
}
