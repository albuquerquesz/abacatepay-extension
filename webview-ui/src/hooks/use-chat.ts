import { useCallback, useState } from "react";
import type { Conversation, Message } from "../types/chat";

const MOCK_RESPONSES = [
	"Olá! Sou o assistente da AbacatePay. Como posso ajudar você hoje?",
	"Entendi sua dúvida. Deixe-me explicar de forma simples...",
	"Boa pergunta! A AbacatePay oferece várias opções para isso.",
	"Posso ajudar com integrações, cobranças, webhooks e muito mais.",
	"Aqui está um exemplo de como você pode implementar isso no seu código.",
];

function generateId(): string {
	if (typeof crypto !== "undefined" && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function getRandomResponse(): string {
	const index = Math.floor(Math.random() * MOCK_RESPONSES.length);
	return MOCK_RESPONSES[index];
}

function generateTitle(firstMessage: string): string {
	const maxLength = 40;
	if (firstMessage.length <= maxLength) {
		return firstMessage;
	}
	return `${firstMessage.slice(0, maxLength).trim()}...`;
}

interface UseChatReturn {
	messages: Message[];
	conversations: Conversation[];
	activeConversationId: string | null;
	isLoading: boolean;
	sendMessage: (content: string) => void;
	selectConversation: (id: string) => void;
	newConversation: () => void;
	clearMessages: () => void;
}

export function useChat(): UseChatReturn {
	const [conversations, setConversations] = useState<Conversation[]>([]);

	const [activeConversationId, setActiveConversationId] = useState<
		string | null
	>(null);

	const [isLoading, setIsLoading] = useState(false);

	const messages: Message[] =
		conversations.find((c) => c.id === activeConversationId)?.messages ?? [];

	const simulateAssistantResponse = useCallback((conversationId: string) => {
		setIsLoading(true);

		const delay = 1000 + Math.random() * 1000;

		setTimeout(() => {
			const assistantMessage: Message = {
				id: generateId(),
				role: "assistant",
				content: getRandomResponse(),
				timestamp: new Date(),
			};

			setConversations((prev) =>
				prev.map((conv) =>
					conv.id === conversationId
						? {
								...conv,
								messages: [...conv.messages, assistantMessage],
								updatedAt: new Date(),
							}
						: conv,
				),
			);

			setIsLoading(false);
		}, delay);
	}, []);

	const sendMessage = useCallback(
		(content: string) => {
			const now = new Date();

			const userMessage: Message = {
				id: generateId(),
				role: "user",
				content,
				timestamp: now,
			};

			if (!activeConversationId) {
				const newConv: Conversation = {
					id: generateId(),
					title: generateTitle(content),
					messages: [userMessage],
					createdAt: now,
					updatedAt: now,
				};

				setConversations((prev) => [newConv, ...prev]);
				setActiveConversationId(newConv.id);

				simulateAssistantResponse(newConv.id);
			} else {
				setConversations((prev) =>
					prev.map((conv) =>
						conv.id === activeConversationId
							? {
									...conv,
									messages: [...conv.messages, userMessage],
									updatedAt: now,
								}
							: conv,
					),
				);

				simulateAssistantResponse(activeConversationId);
			}
		},
		[activeConversationId, simulateAssistantResponse],
	);

	const selectConversation = useCallback((id: string) => {
		setActiveConversationId(id);
	}, []);

	const newConversation = useCallback(() => {
		setActiveConversationId(null);
	}, []);

	const clearMessages = useCallback(() => {
		if (!activeConversationId) return;

		setConversations((prev) =>
			prev.map((conv) =>
				conv.id === activeConversationId
					? {
							...conv,
							messages: [],
							updatedAt: new Date(),
						}
					: conv,
			),
		);
	}, [activeConversationId]);

	return {
		messages,
		conversations,
		activeConversationId,
		isLoading,
		sendMessage,
		selectConversation,
		newConversation,
		clearMessages,
	};
}
