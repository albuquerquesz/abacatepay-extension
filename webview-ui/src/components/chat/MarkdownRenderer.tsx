import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
	content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
	return (
		<ReactMarkdown
			components={{
				code({ className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");
					const codeString = String(children).replace(/\n$/, "");

					if (match) {
						return (
							<div className="my-3 rounded-lg overflow-hidden border border-vscode-border">
								<div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-vscode-border">
									<span className="text-xs text-gray-400 uppercase tracking-wide">
										{match[1]}
									</span>
									<button
										type="button"
										onClick={() => navigator.clipboard.writeText(codeString)}
										className="text-xs text-gray-400 hover:text-[#4ADE80] transition-colors"
									>
										Copiar
									</button>
								</div>
								<SyntaxHighlighter
									style={oneDark}
									language={match[1]}
									PreTag="div"
									customStyle={{
										margin: 0,
										padding: "1rem",
										fontSize: "0.875rem",
										lineHeight: "1.5",
										background: "#1e1e1e",
									}}
								>
									{codeString}
								</SyntaxHighlighter>
							</div>
						);
					}

					return (
						<code
							className="px-1.5 py-0.5 rounded bg-[#2d2d2d] text-[#4ADE80] text-sm font-mono"
							{...props}
						>
							{children}
						</code>
					);
				},

				h1: ({ children }) => (
					<h1 className="text-xl font-bold text-vscode-fg mt-4 mb-2 border-b border-vscode-border pb-2">
						{children}
					</h1>
				),
				h2: ({ children }) => (
					<h2 className="text-lg font-bold text-vscode-fg mt-3 mb-2">
						{children}
					</h2>
				),
				h3: ({ children }) => (
					<h3 className="text-base font-semibold text-vscode-fg mt-2 mb-1">
						{children}
					</h3>
				),

				p: ({ children }) => (
					<p className="text-vscode-fg leading-relaxed mb-2 last:mb-0">
						{children}
					</p>
				),

				ul: ({ children }) => (
					<ul className="list-disc list-inside space-y-1 mb-2 text-vscode-fg">
						{children}
					</ul>
				),
				ol: ({ children }) => (
					<ol className="list-decimal list-inside space-y-1 mb-2 text-vscode-fg">
						{children}
					</ol>
				),
				li: ({ children }) => <li className="text-vscode-fg">{children}</li>,

				a: ({ href, children }) => (
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#4ADE80] hover:underline"
					>
						{children}
					</a>
				),

				strong: ({ children }) => (
					<strong className="font-semibold text-vscode-fg">{children}</strong>
				),
				em: ({ children }) => (
					<em className="italic text-vscode-fg">{children}</em>
				),

				blockquote: ({ children }) => (
					<blockquote className="border-l-4 border-[#4ADE80] pl-4 my-2 text-gray-400 italic">
						{children}
					</blockquote>
				),
				hr: () => <hr className="my-4 border-vscode-border" />,

				pre: ({ children }) => (
					<pre className="my-3 p-4 rounded-lg bg-[#1e1e1e] border border-vscode-border overflow-x-auto">
						{children}
					</pre>
				),
			}}
		>
			{content}
		</ReactMarkdown>
	);
}
