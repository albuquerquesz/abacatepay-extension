interface HeaderProps {
	onToggleSidebar: () => void;
	sidebarOpen: boolean;
}

export function Header({ onToggleSidebar, sidebarOpen }: HeaderProps) {
	return (
		<header className="flex items-center justify-between px-4 py-3 bg-vscode-card-bg">
			<div className="flex items-center gap-2">
				<span className="text-2xl" role="img" aria-label="Abacate">
					🥑
				</span>
				<h1 className="text-base font-semibold text-vscode-fg">
					AbacatePay Assistant
				</h1>
			</div>

			<button
				type="button"
				onClick={onToggleSidebar}
				className="p-2 rounded hover:bg-vscode-input-bg transition-colors cursor-pointer"
				aria-label={sidebarOpen ? "Fechar sidebar" : "Abrir sidebar"}
				aria-expanded={sidebarOpen}
			>
				<svg
					className="w-5 h-5 text-vscode-fg"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					{sidebarOpen ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					)}
				</svg>
			</button>
		</header>
	);
}
