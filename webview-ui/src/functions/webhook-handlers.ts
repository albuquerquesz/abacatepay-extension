import { vscode } from "../utils/vscode";

// TODO: Implementar integração com API AbacatePay

export function handleCreateWebhook() {
  console.log("Criar Webhook");
}

export function handleListWebhooks() {
  console.log("Listar Webhooks");
}

export function handleWebhookListen(url: string) {
  vscode.postMessage({
    command: "run-terminal",
    payload: {
      command: `abacate listen --forward-to ${url}`,
    },
  });
}

export function handleResendEvent(eventId: string) {
  console.log("Reenviando evento:", eventId);
}
