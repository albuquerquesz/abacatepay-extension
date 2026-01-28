import * as React from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-xs font-medium text-vscode-foreground opacity-80">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={`
              w-full appearance-none rounded border border-vscode-input-border 
              bg-vscode-input-bg px-3 py-2 text-sm text-vscode-input-foreground 
              outline-none ring-offset-vscode-bg transition-colors
              focus:border-vscode-focusBorder focus:ring-1 focus:ring-vscode-focusBorder
              disabled:cursor-not-allowed disabled:opacity-50
              ${error ? "border-red-500 focus:ring-red-500" : ""}
              ${className}
            `}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-vscode-input-foreground opacity-50">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
