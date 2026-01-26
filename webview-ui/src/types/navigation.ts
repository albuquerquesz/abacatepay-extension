// The available view types
export type ViewType = "chat" | "billing" | "webhooks";

// Item within a sidebar section
export interface SidebarItem {
	id: string;
	label: string;
	icon?: string; // optional icon name
}

// A section in the sidebar (accordion)
export interface SidebarSection {
	id: ViewType;
	title: string;
	items: SidebarItem[];
}
