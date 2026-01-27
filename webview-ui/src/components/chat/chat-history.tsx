import { MessageSquare, Plus } from "lucide-react";
import type { Conversation } from "../../types/chat";

interface ChatHistoryProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Hoje";
  if (days === 1) return "Ontem";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}

export function ChatHistory({
  conversations,
  activeId,
  onSelect,
  onNewChat,
}: ChatHistoryProps) {
  return (
    <div className="flex flex-col h-full bg-vscode-bg">
      <div className="p-3 border-b border-vscode-border">
        <button
          type="button"
          onClick={onNewChat}
          className="
            w-full
            px-3 py-2
            text-sm font-medium
            text-black
            bg-abacate-primary
            rounded-md
            hover:bg-abacate-primary
            active:bg-[#7ACC4A]
            transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-abacate-primary/50
          "
        >
          <Plus size={18} />
          Nova conversa
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-vscode-fg/50 text-sm">
            Nenhuma conversa ainda
          </div>
        ) : (
          <ul className="py-2">
            {conversations.map((conversation) => {
              const isActive = conversation.id === activeId;

              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(conversation.id)}
                    className={`
                      flex items-start gap-3
                      w-full
                      px-3 py-2.5
                      text-left
                      transition-colors duration-150
                      focus:outline-none
                      ${isActive
                        ? "bg-[#9EEA6C]/10 border-l-2 border-[#9EEA6C]"
                        : "hover:bg-white/5 border-l-2 border-transparent"
                      }
                    `}
                  >
                    <span
                      className={`
                        mt-0.5 shrink-0
                        ${isActive ? "text-[#9EEA6C]" : "text-vscode-fg/50"}
                      `}
                    >
                      <MessageSquare size={14} />
                    </span>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`
                          text-sm font-medium truncate
                          ${isActive ? "text-[#9EEA6C]" : "text-vscode-fg"}
                        `}
                      >
                        {conversation.title}
                      </p>

                      <p className="text-xs text-vscode-fg/50 mt-0.5">
                        {formatDate(conversation.updatedAt)}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
