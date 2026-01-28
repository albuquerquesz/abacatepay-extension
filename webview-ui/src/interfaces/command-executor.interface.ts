export interface ICommandExecutor {
	runTerminal(command: string): void;
	showInfo(message: string): void;
	showError(message: string): void;
}
