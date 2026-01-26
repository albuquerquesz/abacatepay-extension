import { ArrowUp, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAutoScroll } from "../../hooks/use-autoscroll";
import type { Conversation, Message } from "../../types/chat";
import type { ViewType } from "../../types/navigation";
import { BillingView } from "../billing/billing-view";
import { ActivityBar } from "../layout/activity-bar";
import { Sidebar } from "../layout/sidebar";
import { WebhooksView } from "../webhooks/webhooks-view";

export function ChatContainer() {
  const [activeView, setActiveView] = useState<ViewType>("chat");

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);

  const messagesContainerRef = useAutoScroll(messages.length);

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: "Nova conversa",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setMessages([]);
  };

  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (conversation) {
      setActiveConversationId(conversationId);
      setMessages(conversation.messages);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Esta é uma resposta de exemplo. A integração com a API será implementada em breve.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 5000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderChatView = () => (
    <>
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="relative mb-4">
              <span className="text-6xl">🥑</span>
              <Sparkles
                className="absolute -top-2 -right-2 text-abacate-primary animate-pulse"
                size={24}
              />
            </div>
            <h2 className="text-lg font-semibold text-vscode-fg mb-1">
              AbacatePay Assistant
            </h2>
            <p className="text-xs text-vscode-fg/60 max-w-xs">
              Seu assistente de integração de pagamentos
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
									max-w-[85%] px-3 py-2 rounded-lg text-sm
									${message.role === "user"
                    ? "bg-[#9EEA6C] text-black"
                    : "bg-vscode-message-bg text-vscode-fg"
                  }
								`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#9EEA6C]/20 flex items-center justify-center">
              <span className="text-sm">🥑</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2">
              <span className="w-2 h-2 bg-[#9EEA6C] rounded-full typing-dot" />
              <span className="w-2 h-2 bg-[#9EEA6C] rounded-full typing-dot" />
              <span className="w-2 h-2 bg-[#9EEA6C] rounded-full typing-dot" />
            </div>
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-end gap-2 bg-vscode-input-bg rounded-lg p-3 border-l border-vscode-subtle-border focus-within:border-[#9EEA6C] transition-colors">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Mensagem..."
            rows={1}
            className="flex-1 bg-transparent text-vscode-fg text-sm resize-none outline-none border-none placeholder:text-vscode-fg/40 py-1 max-h-24"
            style={{ height: "auto" }}
            ref={(textarea) => {
              if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height = `${Math.min(textarea.scrollHeight, 96)}px`;
              }
            }}
          />
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="p-1.5 rounded-md bg-[#9EEA6C] text-black disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-opacity flex items-center justify-center"
            aria-label="Enviar"
          >
            <ArrowUp size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
    </>
  );

  const renderMainContent = () => {
    switch (activeView) {
      case "billing":
        return <BillingView />;
      case "webhooks":
        return <WebhooksView />;
      case "chat":
      default:
        return renderChatView();
    }
  };

  return (
    <div className="flex h-screen bg-vscode-bg">
      <ActivityBar activeView={activeView} onViewChange={handleViewChange} />

      {activeView === "chat" && (
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onNewConversation={handleNewConversation}
          onSelectConversation={handleSelectConversation}
        />
      )}

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden border-l border-vscode-subtle-border">
        {renderMainContent()}
      </main>
    </div>
  );
}
