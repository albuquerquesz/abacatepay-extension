import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface JsonViewerProps {
	data: unknown;
	className?: string;
}

export function JsonViewer({ data, className = "" }: JsonViewerProps) {
	const jsonString = JSON.stringify(data, null, 2);

	return (
		<div
			className={`rounded-xl border border-vscode-input-border overflow-hidden ${className}`}
		>
			<SyntaxHighlighter
				language="json"
				style={oneDark}
				customStyle={{
					margin: 0,
					padding: "1rem",
					fontSize: "0.75rem",
					lineHeight: "1.5",
					background: "transparent",
				}}
			>
				{jsonString}
			</SyntaxHighlighter>
		</div>
	);
}