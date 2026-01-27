import * as vscode from "vscode";

interface ApiRequestOptions {
	method?: string;
	body?: unknown;
	headers?: Record<string, string>;
}

export class ApiService {
	private get baseUrl(): string {
		return "https://api.abacatepay.com/v1"; // Ajuste conforme a URL real
	}

	private get apiKey(): string | undefined {
		return vscode.workspace.getConfiguration("abacatepay").get("apiKey");
	}

	public async request(endpoint: string, options: ApiRequestOptions = {}) {
		const url = `${this.baseUrl}${endpoint}`;
		const token = this.apiKey;

		if (!token) {
			throw new Error("API Key não configurada. Faça login primeiro.");
		}

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			...options.headers,
		};

		const config: RequestInit = {
			method: options.method || "GET",
			headers,
		};

		if (options.body) {
			config.body = JSON.stringify(options.body);
		}

		try {
			const response = await fetch(url, config);
			const responseData = await response.json();

			if (!response.ok) {
				throw new Error(
					(responseData as any).error ||
						`Erro na requisição: ${response.statusText}`,
				);
			}

			return responseData;
		} catch (error) {
			console.error("API Request Error:", error);
			throw error;
		}
	}
}

export const apiService = new ApiService();
