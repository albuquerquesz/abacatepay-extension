import type { ViewType } from "../../types/navigation";

interface ActivityBarProps {
	activeView: ViewType;
	onViewChange: (view: ViewType) => void;
}

interface ActivityBarItemProps {
	icon: string;
	label: string;
	isActive: boolean;
	onClick: () => void;
}

function ActivityBarItem({
	icon,
	label,
	isActive,
	onClick,
}: ActivityBarItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			title={label}
			className={`
				w-full aspect-square flex items-center justify-center text-xl
				transition-colors cursor-pointer relative
				${
					isActive
						? "text-abacate-primary bg-abacate-primary/10"
						: "text-vscode-fg/50 hover:text-vscode-fg hover:bg-vscode-input-bg"
				}
			`}
		>
			{isActive && (
				<span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-abacate-primary rounded-r" />
			)}
			<span>{icon}</span>
		</button>
	);
}

const navItems: { id: ViewType; icon: string; label: string }[] = [
	{ id: "chat", icon: "💬", label: "Chat" },
	{ id: "billing", icon: "💳", label: "Billing" },
	{ id: "webhooks", icon: "🔗", label: "Webhooks" },
];

export function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
	return (
		<nav className="w-12 h-full bg-vscode-card-bg border-r border-white/5 flex flex-col shrink-0">
			{navItems.map((item) => (
				<ActivityBarItem
					key={item.id}
					icon={item.icon}
					label={item.label}
					isActive={activeView === item.id}
					onClick={() => onViewChange(item.id)}
				/>
			))}
		</nav>
	);
}
