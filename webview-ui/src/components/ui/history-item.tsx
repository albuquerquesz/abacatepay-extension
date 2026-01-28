interface HistoryItemProps {
	item: {
		id: string;
		type: string;
		timestamp: string;
	};
	onClick: () => void;
}

export function HistoryItem({ item, onClick }: HistoryItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="w-full flex flex-col gap-2 p-4 rounded-xl transition-all cursor-pointer text-left group
        vsc-dark:bg-white/5 vsc-dark:border-white/10
        vsc-light:bg-vscode-input-bg vsc-light:border-vscode-input-border
        hover:bg-abacate-primary/10 hover:border-abacate-primary/30"
		>
			<div className="flex justify-between items-start w-full">
				<h3 className="text-sm font-bold text-vscode-fg group-hover:text-abacate-primary transition-colors">
					{item.type}
				</h3>
				<span className="text-[10px] opacity-50 font-mono uppercase tracking-wider">
					{item.id}
				</span>
			</div>
			<div className="flex justify-between items-center w-full">
				<p className="text-xs text-vscode-fg/50 font-mono">
					{new Date(item.timestamp).toLocaleString()}
				</p>
				<span className="text-[10px] text-abacate-primary opacity-0 group-hover:opacity-100 transition-opacity font-bold">
					VER DETALHES →
				</span>
			</div>
		</button>
	);
}
