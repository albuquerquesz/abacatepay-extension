import type { Message } from "../../types/chat";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface ChatMessageProps {
	message: Message;
}

function formatTimestamp(date: Date): string {
	return new Intl.DateTimeFormat("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);
}

export function ChatMessage({ message }: ChatMessageProps) {
	const isUser = message.role === "user";

	return (
		<div
			className={`
        flex w-full animate-fade-in
        ${isUser ? "justify-end" : "justify-start"}
      `}
		>
			<div
				className={`
          flex gap-3 max-w-[85%]
          ${isUser ? "flex-row-reverse" : "flex-row"}
        `}
			>
				{!isUser && (
					<div className="shrink-0 w-8 h-8 rounded-full bg-[#4ADE80]/20 flex items-center justify-center">
						<span className="text-lg" role="img" aria-label="Abacate Assistant">
							🥑
						</span>
					</div>
				)}

				<div className="flex flex-col gap-1">
					<div
						className={`
              px-4 py-3 rounded-2xl
              ${
								isUser
									? "bg-[#4ADE80]/20 text-vscode-fg rounded-br-md"
									: "bg-vscode-card-bg border border-vscode-border rounded-bl-md"
							}
            `}
					>
						{isUser ? (
							<p className="text-vscode-fg whitespace-pre-wrap">
								{message.content}
							</p>
						) : (
							<MarkdownRenderer content={message.content} />
						)}
					</div>

					<span
						className={`
              text-xs text-gray-500
              ${isUser ? "text-right" : "text-left"}
            `}
					>
						{formatTimestamp(message.timestamp)}
					</span>
				</div>
			</div>
		</div>
	);
}
