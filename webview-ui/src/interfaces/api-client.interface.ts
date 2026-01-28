export interface ApiOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	body?: unknown;
}

export interface IApiClient {
	request<T = unknown>(endpoint: string, options?: ApiOptions): Promise<T>;
	get<T = unknown>(endpoint: string): Promise<T>;
	post<T = unknown>(endpoint: string, body: unknown): Promise<T>;
}
