import { MenuItem, type MenuItemProps } from "./menu-item";

export interface MenuOption extends MenuItemProps {}

interface MenuListProps {
	options: MenuOption[];
	className?: string;
}

export function MenuList({ options, className = "" }: MenuListProps) {
	return (
		<div className={`space-y-3 ${className}`}>
			{options.map((option) => (
				<MenuItem
					key={option.label}
					label={option.label}
					description={option.description}
					onClick={option.onClick}
					icon={option.icon}
					disabled={option.disabled}
				/>
			))}
		</div>
	);
}
