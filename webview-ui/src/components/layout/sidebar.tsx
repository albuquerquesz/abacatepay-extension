import type { Conversation } from "../../types/chat";

interface SidebarProps {
	conversations: Conversation[];
	activeConversationId: string | null;
	onNewConversation: () => void;
	onSelectConversation: (id: string) => void;
}

const MAX_TITLE_LENGTH = 12;

function truncateTitle(title: string): string {
	if (title.length <= MAX_TITLE_LENGTH) return title;
	return `${title.slice(0, MAX_TITLE_LENGTH)}...`;
}

export function Sidebar({
	conversations,
	activeConversationId,
	onNewConversation,
	onSelectConversation,
}: SidebarProps) {
	return (
		<aside className="w-32 h-full bg-vscode-card-bg border-r border-white/5 flex flex-col shrink-0 overflow-hidden">
			<div className="p-2 flex justify-center">
				<button
					type="button"
					onClick={onNewConversation}
					title="Nova conversa"
					className="w-7 h-7 flex items-center justify-center text-sm bg-abacate-primary hover:bg-abacate-secondary text-abacate-dark font-bold rounded transition-colors cursor-pointer"
				>
					+
				</button>
			</div>

			<div className="flex-1 overflow-y-auto px-1.5 pb-2">
				{conversations.length === 0 ? (
					<p className="text-[10px] text-vscode-fg/50 text-center py-3">
						Sem conversas
					</p>
				) : (
					<ul className="space-y-0.5">
						{conversations.map((conversation) => (
							<li key={conversation.id}>
								<button
									type="button"
									onClick={() => onSelectConversation(conversation.id)}
									title={conversation.title}
									className={`
										w-full text-left px-1.5 py-1 text-[11px] rounded transition-colors cursor-pointer
										${
											activeConversationId === conversation.id
												? "bg-abacate-primary/20 text-abacate-primary"
												: "hover:bg-vscode-input-bg text-vscode-fg/80"
										}
									`}
								>
									{truncateTitle(conversation.title)}
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</aside>
	);
}
