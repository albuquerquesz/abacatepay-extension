import { type KeyboardEvent, useCallback, useState } from "react";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";

interface ChatInputProps {
	onSend: (message: string) => void;
	disabled?: boolean;
	placeholder?: string;
}

function SendIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<title>Enviar</title>
			<line x1="22" y1="2" x2="11" y2="13" />
			<polygon points="22 2 15 22 11 13 2 9 22 2" />
		</svg>
	);
}

export function ChatInput({
	onSend,
	disabled = false,
	placeholder = "Digite sua mensagem...",
}: ChatInputProps) {
	const [message, setMessage] = useState("");

	const handleSend = useCallback(() => {
		const trimmedMessage = message.trim();
		if (trimmedMessage && !disabled) {
			onSend(trimmedMessage);
			setMessage("");
		}
	}, [message, disabled, onSend]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLTextAreaElement>) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				handleSend();
			}
		},
		[handleSend],
	);

	const canSend = message.trim().length > 0 && !disabled;

	return (
		<div className="flex items-end gap-2 p-4 border-t border-vscode-border bg-vscode-bg">
			<Textarea
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				disabled={disabled}
				minRows={1}
				maxRows={6}
				className="flex-1"
			/>

			<Button
				variant="primary"
				size="md"
				onClick={handleSend}
				disabled={!canSend}
				aria-label="Enviar mensagem"
				className="shrink-0 h-10 w-10 p-0"
			>
				<SendIcon />
			</Button>
		</div>
	);
}
