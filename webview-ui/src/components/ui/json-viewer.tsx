import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../../hooks/use-theme";

interface JsonViewerProps {
  data: unknown;
  className?: string;
}

export function JsonViewer({ data, className = "" }: JsonViewerProps) {
  const theme = useTheme();
  const jsonString = JSON.stringify(data, null, 2);

  return (
    <div
      className={`rounded-xl border border-vscode-input-border overflow-hidden bg-vscode-bg ${className}`}
    >
      <SyntaxHighlighter
        language="json"
        style={theme === "light" ? vs : vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.75rem",
          lineHeight: "1.5",
          background: "transparent",
        }}
        codeTagProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
      >
        {jsonString}
      </SyntaxHighlighter>
    </div>
  );
}

