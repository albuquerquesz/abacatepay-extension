import { useState } from "react";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import type { Conversation, Message } from "../../types/chat";
import { Header } from "../layout/Header";
import { Sidebar } from "../layout/Sidebar";

export function ChatContainer() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [activeConversationId, setActiveConversationId] = useState<
		string | null
	>(null);

	const messagesContainerRef = useAutoScroll(messages.length);

	const handleToggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};

	const handleNewConversation = () => {
		const newConversation: Conversation = {
			id: crypto.randomUUID(),
			title: "Nova conversa",
			messages: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		setConversations((prev) => [newConversation, ...prev]);
		setActiveConversationId(newConversation.id);
		setMessages([]);
	};

	const handleSelectConversation = (conversationId: string) => {
		const conversation = conversations.find((c) => c.id === conversationId);
		if (conversation) {
			setActiveConversationId(conversationId);
			setMessages(conversation.messages);
		}
	};

	const handleSendMessage = () => {
		if (!inputValue.trim() || isLoading) return;

		const userMessage: Message = {
			id: crypto.randomUUID(),
			role: "user",
			content: inputValue.trim(),
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setIsLoading(true);

		setTimeout(() => {
			const assistantMessage: Message = {
				id: crypto.randomUUID(),
				role: "assistant",
				content:
					"Esta é uma resposta de exemplo. A integração com a API será implementada em breve.",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, assistantMessage]);
			setIsLoading(false);
		}, 1000);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="flex flex-col h-screen bg-vscode-bg">
			<Header onToggleSidebar={handleToggleSidebar} sidebarOpen={sidebarOpen} />

			<div className="flex flex-1 overflow-hidden relative">
				{sidebarOpen && (
					<button
						type="button"
						className="absolute inset-0 bg-black/50 z-10 md:hidden cursor-default"
						onClick={handleToggleSidebar}
						aria-label="Fechar sidebar"
					/>
				)}

				<div
					className={`
					${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
					absolute md:relative z-20 h-full
					transition-transform duration-300 ease-in-out
				`}
				>
					<Sidebar isOpen={sidebarOpen}>
						<div className="p-3 border-b border-vscode-border">
							<button
								type="button"
								onClick={handleNewConversation}
								className="w-full py-2 px-3 text-sm bg-abacate-primary hover:bg-abacate-secondary text-abacate-dark font-medium rounded transition-colors cursor-pointer"
							>
								+ Nova conversa
							</button>
						</div>

						<div className="flex-1 overflow-y-auto p-2">
							{conversations.length === 0 ? (
								<p className="text-xs text-vscode-fg/50 text-center py-4">
									Nenhuma conversa ainda
								</p>
							) : (
								<ul className="space-y-1">
									{conversations.map((conversation) => (
										<li key={conversation.id}>
											<button
												type="button"
												onClick={() =>
													handleSelectConversation(conversation.id)
												}
												className={`
													w-full text-left px-3 py-2 text-sm rounded transition-colors cursor-pointer
													${
														activeConversationId === conversation.id
															? "bg-abacate-primary/20 text-abacate-primary"
															: "hover:bg-vscode-input-bg text-vscode-fg"
													}
												`}
											>
												{conversation.title}
											</button>
										</li>
									))}
								</ul>
							)}
						</div>
					</Sidebar>
				</div>

				<main className="flex-1 flex flex-col min-w-0 overflow-hidden">
					<div
						ref={messagesContainerRef}
						className="flex-1 overflow-y-auto p-4 space-y-4"
					>
						{messages.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-full text-center">
								<span className="text-6xl mb-4">🥑</span>
								<h2 className="text-xl font-semibold text-vscode-fg mb-2">
									Bem-vindo ao AbacatePay Assistant
								</h2>
								<p className="text-sm text-vscode-fg/60 max-w-md">
									Sou seu assistente de integração de pagamentos. Como posso
									ajudá-lo hoje?
								</p>
							</div>
						) : (
							messages.map((message) => (
								<div
									key={message.id}
									className={`
										flex
										${message.role === "user" ? "justify-end" : "justify-start"}
									`}
								>
									<div
										className={`
											max-w-[80%] px-4 py-3 rounded-lg
											${
												message.role === "user"
													? "bg-abacate-primary text-abacate-dark"
													: "bg-vscode-card-bg border border-vscode-border text-vscode-fg"
											}
										`}
									>
										<p className="text-sm whitespace-pre-wrap">
											{message.content}
										</p>
									</div>
								</div>
							))
						)}

						{isLoading && (
							<div className="flex justify-start">
								<div className="bg-vscode-card-bg border border-vscode-border px-4 py-3 rounded-lg">
									<div className="flex items-center gap-1">
										<span className="w-2 h-2 bg-abacate-primary rounded-full animate-bounce" />
										<span
											className="w-2 h-2 bg-abacate-primary rounded-full animate-bounce"
											style={{ animationDelay: "0.1s" }}
										/>
										<span
											className="w-2 h-2 bg-abacate-primary rounded-full animate-bounce"
											style={{ animationDelay: "0.2s" }}
										/>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className="border-t border-vscode-border p-4">
						<div className="flex gap-2">
							<textarea
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="Digite sua mensagem..."
								rows={1}
								className="flex-1 bg-vscode-input-bg text-vscode-input-fg border border-vscode-input-border rounded-lg px-4 py-3 text-sm resize-none outline-none focus:ring-1 focus:ring-abacate-primary"
							/>
							<button
								type="button"
								onClick={handleSendMessage}
								disabled={!inputValue.trim() || isLoading}
								className="px-4 py-2 bg-abacate-primary hover:bg-abacate-secondary disabled:bg-vscode-input-bg disabled:text-vscode-fg/50 text-abacate-dark font-medium rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
							>
								Enviar
							</button>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
