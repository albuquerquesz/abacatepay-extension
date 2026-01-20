import type { ReactNode } from "react";

interface CardProps {
	children: ReactNode;
	className?: string;
	noPadding?: boolean;
}

export function Card({
	children,
	className = "",
	noPadding = false,
}: CardProps) {
	return (
		<div
			className={`
        bg-vscode-card-bg
        border border-vscode-border
        rounded-lg
        shadow-sm
        ${noPadding ? "" : "p-4"}
        ${className}
      `}
		>
			{children}
		</div>
	);
}

interface CardHeaderProps {
	title: string;
	description?: string;
	actions?: ReactNode;
	className?: string;
}

export function CardHeader({
	title,
	description,
	actions,
	className = "",
}: CardHeaderProps) {
	return (
		<div className={`flex items-start justify-between gap-4 ${className}`}>
			<div className="flex-1 min-w-0">
				<h3 className="text-sm font-medium text-vscode-fg truncate">{title}</h3>
				{description && (
					<p className="mt-1 text-xs text-vscode-fg/70">{description}</p>
				)}
			</div>
			{actions && <div className="flex-shrink-0">{actions}</div>}
		</div>
	);
}

interface CardContentProps {
	children: ReactNode;
	className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
	return <div className={`mt-3 ${className}`}>{children}</div>;
}

interface CardFooterProps {
	children: ReactNode;
	className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
	return (
		<div
			className={`
        mt-4 pt-3
        border-t border-vscode-border
        flex items-center justify-end gap-2
        ${className}
      `}
		>
			{children}
		</div>
	);
}
