import { useEffect, useRef } from "react";
import type { Message } from "../../types/chat";
import { LoadingDots } from "../ui/loading-dots";
import { ChatMessage } from "./chat-message";

interface MessageListProps {
	messages: Message[];
	isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isLoading]);

	return (
		<div
			ref={scrollContainerRef}
			className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-vscode-border scrollbar-track-transparent"
		>
			{messages.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
					<span className="text-4xl mb-3" role="img" aria-label="Abacate">
						🥑
					</span>
					<p className="text-sm">Olá! Sou o assistente da AbacatePay.</p>
					<p className="text-sm">Como posso ajudar você hoje?</p>
				</div>
			) : (
				messages.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))
			)}

			{isLoading && (
				<div className="flex items-start gap-3 animate-fade-in">
					<div className="shrink-0 w-8 h-8 rounded-full bg-[#9EEA6C]/20 flex items-center justify-center">
						<span className="text-lg" role="img" aria-label="Abacate Assistant">
							🥑
						</span>
					</div>

					<div className="px-4 py-3 rounded-2xl rounded-bl-md bg-vscode-card-bg border border-vscode-border">
						<LoadingDots />
					</div>
				</div>
			)}

			<div ref={messagesEndRef} />
		</div>
	);
}
