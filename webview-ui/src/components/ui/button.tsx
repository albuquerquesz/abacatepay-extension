import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"bg-[#9EEA6C] text-black hover:bg-[#8BD85A] active:bg-[#7ACC4A] disabled:bg-[#9EEA6C]/50",
	secondary:
		"bg-vscode-button-bg text-vscode-button-fg hover:bg-vscode-button-hover disabled:opacity-50",
	ghost:
		"bg-transparent text-vscode-fg hover:bg-white/10 active:bg-white/15 disabled:opacity-50",
};

const sizeClasses: Record<ButtonSize, string> = {
	sm: "px-2.5 py-1 text-xs rounded",
	md: "px-4 py-2 text-sm rounded-md",
	lg: "px-6 py-2.5 text-base rounded-lg",
};

export function Button({
	children,
	variant = "primary",
	size = "md",
	className = "",
	disabled,
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			className={`
        inline-flex items-center justify-center
        font-medium
        transition-colors duration-150 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-[#9EEA6C]/50 focus:ring-offset-1 focus:ring-offset-transparent
        disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
			{...props}
		>
			{children}
		</button>
	);
}
