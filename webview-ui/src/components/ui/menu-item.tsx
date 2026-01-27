import type { ReactNode } from "react";

export interface MenuItemProps {
	label: string;
	description: string;
	onClick: () => void;
	icon?: ReactNode;
	disabled?: boolean;
}

export function MenuItem({
	label,
	description,
	onClick,
	icon,
	disabled = false,
}: MenuItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className="w-full flex flex-col gap-1 p-4 rounded-xl transition-all cursor-pointer text-left group
        vsc-dark:bg-white/5 vsc-dark:border-white/10
        vsc-light:bg-vscode-input-bg vsc-light:border-vscode-input-border
        hover:bg-abacate-primary/10 hover:border-abacate-primary/30
        disabled:opacity-50 disabled:cursor-not-allowed"
		>
			<h3 className="text-sm font-semibold text-vscode-fg group-hover:text-abacate-primary transition-colors flex items-center gap-2">
				{icon}
				{label}
			</h3>
			<p className="text-xs text-vscode-fg/50 line-clamp-1">{description}</p>
		</button>
	);
}
