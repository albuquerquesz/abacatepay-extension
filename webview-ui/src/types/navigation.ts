export type ViewType = "chat" | "billing" | "webhooks" | "auth";

export interface SidebarItem {
	id: string;
	label: string;
	icon?: string;
}

export interface SidebarSection {
	id: ViewType;
	title: string;
	items: SidebarItem[];
}
