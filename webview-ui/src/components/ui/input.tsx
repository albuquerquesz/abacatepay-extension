import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
	return (
		<div className="w-full space-y-1.5">
			{label && (
				<label className="text-xs font-medium text-vscode-foreground opacity-80">
					{label}
				</label>
			)}
			<input
				className={`
          w-full
          bg-vscode-input-bg
          text-vscode-input-fg
          border
          ${error ? "border-red-500" : "border-vscode-input-border"}
          rounded-lg
          px-3 py-2
          text-sm
          transition-colors duration-150
          placeholder:text-vscode-fg/50
          focus:outline-none
          focus:ring-2
          ${error ? "focus:ring-red-500/50 focus:border-red-500" : "focus:ring-[#9EEA6C]/50 focus:border-[#9EEA6C]"}
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
				{...props}
			/>
			{error && <p className="mt-1 text-xs text-red-500">{error}</p>}
		</div>
	);
}
