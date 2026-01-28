import { type KeyboardEvent, useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Pergunte algo ao AbacatePay...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = useCallback(() => {
    const trimmedMessage = message.trim();
    trimmedMessage && !disabled && (onSend(trimmedMessage), setMessage(""));
  }, [message, disabled, onSend]);

  const keyHandlers: Record<
    string,
    (e: KeyboardEvent<HTMLTextAreaElement>) => void
  > = {
    Enter: (e) => {
      !e.shiftKey && (e.preventDefault(), handleSend());
    },
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const handler = keyHandlers[e.key];
    handler?.(e);
  };

  const canSend = message.trim().length > 0 && !disabled;

  return (
    <div className="p-4 bg-vscode-bg border-t border-vscode-border w-full flex justify-center">
      <div className="relative flex flex-col w-full max-w-3xl rounded-2xl border border-vscode-input-border bg-vscode-input-bg focus-within:border-abacate-primary/50 focus-within:ring-1 focus-within:ring-abacate-primary/30 transition-all duration-200">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          minRows={1}
          maxRows={12}
          className="w-full bg-transparent border-none focus:ring-0 px-4 py-4 pr-14 text-sm rounded-2xl"
        />

        <div className="absolute right-3 bottom-3">
          <Button
            variant="primary"
            size="sm"
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Enviar mensagem"
            className={`
							h-8 w-8 p-0 rounded-xl transition-all duration-200
							${canSend ? "opacity-100 scale-100" : "opacity-30 scale-95"}
						`}
          >
            <ArrowUp size={18} strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  );
}

