interface LoadingDotsProps {
	size?: number;
	color?: string;
	className?: string;
}

export function LoadingDots({
	size = 6,
	color = "#4ADE80",
	className = "",
}: LoadingDotsProps) {
	return (
		<output
			className={`inline-flex items-center gap-1 ${className}`}
			aria-label="Carregando"
		>
			{[0, 1, 2].map((index) => (
				<span
					key={index}
					className="animate-bounce"
					style={{
						width: size,
						height: size,
						backgroundColor: color,
						borderRadius: "50%",
						animationDelay: `${index * 150}ms`,
						animationDuration: "600ms",
					}}
				/>
			))}
			<span className="sr-only">Carregando...</span>
		</output>
	);
}

interface LoadingWithTextProps extends LoadingDotsProps {
	text?: string;
}

export function LoadingWithText({
	text = "Pensando",
	size = 4,
	color = "#4ADE80",
	className = "",
}: LoadingWithTextProps) {
	return (
		<output
			className={`inline-flex items-center gap-2 text-vscode-fg/70 ${className}`}
			aria-label={text}
		>
			<span className="text-sm">{text}</span>
			<LoadingDots size={size} color={color} />
		</output>
	);
}

interface MessageSkeletonProps {
	className?: string;
}

export function MessageSkeleton({ className = "" }: MessageSkeletonProps) {
	return (
		<output
			className={`animate-pulse space-y-2 block ${className}`}
			aria-label="Carregando mensagem"
		>
			<div className="h-3 bg-vscode-fg/10 rounded w-3/4" />
			<div className="h-3 bg-vscode-fg/10 rounded w-full" />
			<div className="h-3 bg-vscode-fg/10 rounded w-5/6" />
			<div className="h-3 bg-vscode-fg/10 rounded w-2/3" />
			<span className="sr-only">Carregando mensagem...</span>
		</output>
	);
}
