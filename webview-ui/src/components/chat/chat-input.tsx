import { type KeyboardEvent, useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
	onSend: (message: string) => void;
	disabled?: boolean;
	placeholder?: string;
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
				<Send size={18} />
			</Button>
		</div>
	);
}
