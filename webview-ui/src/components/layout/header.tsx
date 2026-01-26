import { Menu, X } from "lucide-react";

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
				{sidebarOpen ? (
					<X className="w-5 h-5 text-vscode-fg" />
				) : (
					<Menu className="w-5 h-5 text-vscode-fg" />
				)}
			</button>
		</header>
	);
}
