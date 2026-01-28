import { useState } from "react";
import { useChat } from "../../hooks/use-chat";
import type { ViewType } from "../../types/navigation";
import { AuthView } from "../auth";
import { BillingView } from "../billing/billing-view";
import { ActivityBar } from "../layout/activity-bar";
import { Sidebar } from "../layout/sidebar";
import { WebhooksView } from "../webhooks/webhooks-view";
import { ChatInput } from "./chat-input";
import { MessageList } from "./message-list";

export function ChatContainer() {
  const [activeView, setActiveView] = useState<ViewType>("chat");

  const {
    messages,
    conversations,
    activeConversationId,
    isLoading,
    sendMessage,
    selectConversation,
    newConversation,
  } = useChat();

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  const renderChatView = () => (
    <div className="flex-1 flex flex-col min-h-0 bg-vscode-bg">
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput
        onSend={sendMessage}
        disabled={isLoading}
        placeholder="Pergunte sobre sua integração..."
      />
    </div>
  );

  const renderMainContent = () => {
    switch (activeView) {
      case "billing":
        return <BillingView />;
      case "webhooks":
        return <WebhooksView />;
      case "auth":
        return <AuthView />;
      default:
        return renderChatView();
    }
  };

  return (
    <div className="flex h-screen bg-vscode-bg border-r border-vscode-subtle-border">
      <ActivityBar activeView={activeView} onViewChange={handleViewChange} />

      {activeView === "chat" && (
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onNewConversation={newConversation}
          onSelectConversation={selectConversation}
        />
      )}

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden border-l border-vscode-subtle-border">
        {renderMainContent()}
      </main>
    </div>
  );
}

