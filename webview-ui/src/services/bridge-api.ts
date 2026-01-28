import { vscode } from "../utils/vscode";

interface ApiOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	body?: unknown;
}

class BridgeApi {
	private pendingRequests: Map<
		string,
		{ resolve: (value: any) => void; reject: (reason?: any) => void }
	> = new Map();

	constructor() {
		window.addEventListener("message", (event) => {
			const message = event.data;
			if (message.command === "api-response" && message.requestId) {
				const pending = this.pendingRequests.get(message.requestId);
				if (pending) {
					if (message.success) {
						pending.resolve(message.data);
					} else {
						pending.reject(new Error(message.error));
					}
					this.pendingRequests.delete(message.requestId);
				}
			}
		});
	}

	public async request<T = any>(
		endpoint: string,
		options: ApiOptions = {},
	): Promise<T> {
		const requestId = crypto.randomUUID();

		return new Promise<T>((resolve, reject) => {
			this.pendingRequests.set(requestId, { resolve, reject });

			vscode.postMessage({
				command: "api-request",
				requestId,
				endpoint,
				method: options.method || "GET",
				body: options.body,
			});

			setTimeout(() => {
				if (this.pendingRequests.has(requestId)) {
					this.pendingRequests.delete(requestId);
					reject(new Error("Request timeout"));
				}
			}, 30000);
		});
	}

	public get<T = any>(endpoint: string) {
		return this.request<T>(endpoint, { method: "GET" });
	}

	public post<T = any>(endpoint: string, body: unknown) {
		return this.request<T>(endpoint, { method: "POST", body });
	}
}

export const api = new BridgeApi();
