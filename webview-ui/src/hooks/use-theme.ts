import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function useTheme(): Theme {
	const [theme, setTheme] = useState<Theme>(() => {
		if (document.body.classList.contains("vscode-light")) {
			return "light";
		}
		return "dark";
	});

	useEffect(() => {
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "class"
				) {
					const isLight = document.body.classList.contains("vscode-light");
					setTheme(isLight ? "light" : "dark");
				}
			}
		});

		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	return theme;
}
