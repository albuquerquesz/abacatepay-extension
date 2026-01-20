import type { Conversation } from "../../types/chat";

interface ChatHistoryProps {
	conversations: Conversation[];
	activeId: string | null;
	onSelect: (id: string) => void;
	onNewChat: () => void;
}

function PlusIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<title>Adicionar</title>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	);
}

function ChatIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<title>Conversa</title>
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
		</svg>
	);
}

function formatDate(date: Date): string {
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	if (days === 0) return "Hoje";
	if (days === 1) return "Ontem";

	return date.toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
	});
}

export function ChatHistory({
	conversations,
	activeId,
	onSelect,
	onNewChat,
}: ChatHistoryProps) {
	return (
		<div className="flex flex-col h-full bg-vscode-bg">
			<div className="p-3 border-b border-vscode-border">
				<button
					type="button"
					onClick={onNewChat}
					className="
            flex items-center justify-center gap-2
            w-full
            px-3 py-2
            text-sm font-medium
            text-black
            bg-[#4ADE80]
            rounded-md
            hover:bg-[#22C55E]
            active:bg-[#16A34A]
            transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50
          "
				>
					<PlusIcon />
					Nova conversa
				</button>
			</div>

			<div className="flex-1 overflow-y-auto">
				{conversations.length === 0 ? (
					<div className="p-4 text-center text-vscode-fg/50 text-sm">
						Nenhuma conversa ainda
					</div>
				) : (
					<ul className="py-2">
						{conversations.map((conversation) => {
							const isActive = conversation.id === activeId;

							return (
								<li key={conversation.id}>
									<button
										type="button"
										onClick={() => onSelect(conversation.id)}
										className={`
                      flex items-start gap-3
                      w-full
                      px-3 py-2.5
                      text-left
                      transition-colors duration-150
                      focus:outline-none
                      ${
												isActive
													? "bg-[#4ADE80]/10 border-l-2 border-[#4ADE80]"
													: "hover:bg-white/5 border-l-2 border-transparent"
											}
                    `}
									>
										<span
											className={`
                        mt-0.5 shrink-0
                        ${isActive ? "text-[#4ADE80]" : "text-vscode-fg/50"}
                      `}
										>
											<ChatIcon />
										</span>

										<div className="flex-1 min-w-0">
											<p
												className={`
                          text-sm font-medium truncate
                          ${isActive ? "text-[#4ADE80]" : "text-vscode-fg"}
                        `}
											>
												{conversation.title}
											</p>

											<p className="text-xs text-vscode-fg/50 mt-0.5">
												{formatDate(conversation.updatedAt)}
											</p>
										</div>
									</button>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
}
