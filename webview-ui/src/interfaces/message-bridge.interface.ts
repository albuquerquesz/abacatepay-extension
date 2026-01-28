export interface IMessageBridge {
	postMessage(message: unknown): void;
	getState<T = unknown>(): T | undefined;
	setState<T>(newState: T): T;
}

export interface MessageListener {
	(event: MessageEvent): void;
}

export interface IMessageSubscriber {
	subscribe(listener: MessageListener): () => void;
}
