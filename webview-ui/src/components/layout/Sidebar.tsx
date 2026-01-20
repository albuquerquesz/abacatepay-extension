import type { ReactNode } from "react";

interface SidebarProps {
	isOpen: boolean;
	children: ReactNode;
}

export function Sidebar({ isOpen, children }: SidebarProps) {
	return (
		<aside
			className={`
				${isOpen ? "w-64" : "w-0"}
				h-full
				bg-vscode-card-bg
				border-r border-vscode-border
				transition-all duration-300 ease-in-out
				overflow-hidden
				shrink-0
			`}
			aria-hidden={!isOpen}
		>
			<div className="w-64 h-full flex flex-col">{children}</div>
		</aside>
	);
}
