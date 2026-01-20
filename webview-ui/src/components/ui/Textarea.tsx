import {
	forwardRef,
	type TextareaHTMLAttributes,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";

interface TextareaProps
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	disabled?: boolean;
	className?: string;
	minRows?: number;
	maxRows?: number;
}

const LINE_HEIGHT = 21;

const VERTICAL_PADDING = 16;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	function Textarea(
		{
			value,
			onChange,
			placeholder,
			onKeyDown,
			disabled = false,
			className = "",
			minRows = 1,
			maxRows = 6,
			...props
		},
		ref,
	) {
		const textareaRef = useRef<HTMLTextAreaElement>(null);

		useImperativeHandle(ref, () => textareaRef.current!);

		const adjustHeight = useCallback(() => {
			const textarea = textareaRef.current;
			if (!textarea) return;

			textarea.style.height = "auto";

			const minHeight = LINE_HEIGHT * minRows + VERTICAL_PADDING;
			const maxHeight = LINE_HEIGHT * maxRows + VERTICAL_PADDING;

			const newHeight = Math.min(
				Math.max(textarea.scrollHeight, minHeight),
				maxHeight,
			);
			textarea.style.height = `${newHeight}px`;

			textarea.style.overflowY =
				textarea.scrollHeight > maxHeight ? "auto" : "hidden";
		}, [minRows, maxRows]);

		useEffect(() => {
			adjustHeight();
		}, [adjustHeight]);

		useEffect(() => {
			adjustHeight();
		}, [adjustHeight]);

		return (
			<textarea
				ref={textareaRef}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				disabled={disabled}
				rows={minRows}
				className={`
          w-full
          bg-vscode-input-bg
          text-vscode-input-fg
          border border-vscode-input-border
          rounded-lg
          px-3 py-2
          text-sm
          leading-relaxed
          resize-none
          transition-colors duration-150
          placeholder:text-vscode-fg/50
          focus:outline-none
          focus:ring-2 focus:ring-[#4ADE80]/50
          focus:border-[#4ADE80]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
				{...props}
			/>
		);
	},
);
