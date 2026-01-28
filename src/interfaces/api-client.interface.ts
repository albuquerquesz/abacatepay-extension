export interface ApiRequestOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	body?: unknown;
}

export interface IApiClient {
	request<T = unknown>(endpoint: string, options?: ApiRequestOptions): Promise<T>;
}
