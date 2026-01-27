import { useEffect, useState } from "react";
import { ChatContainer } from "./components/chat/chat-container";
import { LoginScreen } from "./components/login/login-screen";
import { vscode } from "./utils/vscode";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		vscode.postMessage({ command: "check-auth" });

		const handleMessage = (event: MessageEvent) => {
			const message = event.data;
			if (message.command === "auth-status") {
				setIsAuthenticated(message.isAuthenticated);
			}
		};

		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, []);

	if (isAuthenticated === null) {
		return (
			<div className="flex items-center justify-center h-screen bg-vscode-bg border-r border-vscode-subtle-border">
				<div className="animate-pulse text-abacate-primary font-bold">
					🥑 Carregando...
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
	}

	return <ChatContainer />;
}

export default App;
