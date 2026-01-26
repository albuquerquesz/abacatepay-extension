import type { Conversation } from "../../types/chat";

interface SidebarProps {
	conversations: Conversation[];
	activeConversationId: string | null;
	onNewConversation: () => void;
	onSelectConversation: (id: string) => void;
}

export function Sidebar({
	conversations,
	activeConversationId,
	onNewConversation,
	onSelectConversation,
}: SidebarProps) {
	return (
		<aside className="w-48 h-full bg-vscode-card-bg border-r border-white/5 flex flex-col shrink-0 overflow-hidden">
			<div className="p-2">
				<button
					type="button"
					onClick={onNewConversation}
					className="w-full py-2 px-3 text-xs bg-abacate-primary hover:bg-abacate-secondary text-abacate-dark font-medium rounded transition-colors cursor-pointer"
				>
					+ Nova conversa
				</button>
			</div>

			<div className="flex-1 overflow-y-auto p-2 pt-0">
				{conversations.length === 0 ? (
					<p className="text-xs text-vscode-fg/50 text-center py-4">
						Nenhuma conversa
					</p>
				) : (
					<ul className="space-y-1">
						{conversations.map((conversation) => (
							<li key={conversation.id}>
								<button
									type="button"
									onClick={() => onSelectConversation(conversation.id)}
									className={`
										w-full text-left px-2 py-1.5 text-xs rounded transition-colors cursor-pointer truncate
										${
											activeConversationId === conversation.id
												? "bg-abacate-primary/20 text-abacate-primary"
												: "hover:bg-vscode-input-bg text-vscode-fg/80"
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
		</aside>
	);
}
