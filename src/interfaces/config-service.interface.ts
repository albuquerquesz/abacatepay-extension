export interface IConfigService {
	getApiKey(): string | undefined;
	setApiKey(apiKey: string | undefined): Promise<void>;
	isAuthenticated(): boolean;
}
