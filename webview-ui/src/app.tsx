import { useState, useEffect } from "react";
import { ChatContainer } from "./components/chat/chat-container";
import { LoginScreen } from "./components/login/login-screen";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		console.log("AbacatePay Extension: Webview mounted, showing login screen.");
	}, []);

	if (!isAuthenticated) {
		return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
	}

	return <ChatContainer />;
}

export default App;
