import type { ReactNode } from "react";
import { Button } from "./button";

interface ViewLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  onBack?: () => void;
}

export function ViewLayout({
  title,
  description,
  children,
  onBack,
}: ViewLayoutProps) {
  return (
    <div className="flex flex-col h-full bg-vscode-bg text-vscode-fg p-5">
      <div className="mb-6">
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="mb-2 -ml-2">
            ←
          </Button>
        )}
        <h1 className="text-xl font-bold text-vscode-fg flex items-center gap-2">
          {title}
        </h1>
        <p className="text-xs text-vscode-fg/50 mt-1">{description}</p>
      </div>
      {children}
    </div>
  );
}
