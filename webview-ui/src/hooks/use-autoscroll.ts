import { useEffect, useRef } from "react";

export function useAutoScroll(messagesLength: number) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const timeoutId = setTimeout(() => {
			container.scrollTo({
				top: container.scrollHeight,
				behavior: "smooth",
			});
		}, 100);

		return () => clearTimeout(timeoutId);
	}, [messagesLength]);

	return containerRef;
}
