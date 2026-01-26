export type WebviewCommand =
	| { command: "showInfo"; data: string }
	| { command: "showError"; data: string }
	| { command: "getData"; data: { id: string } }
	| { command: "login-google" };
