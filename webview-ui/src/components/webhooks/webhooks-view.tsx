import { useState } from "react";
import {
  handleCreateWebhook,
  handleListLogs,
  handleResendEvent,
  handleTriggerEvent,
  handleWebhookListen,
} from "../../functions/webhook-handlers";
import {
  SAMPLE_EVENTS,
  type SampleEventType,
} from "../../functions/webhook-samples";
import { WebhooksLogs } from "./webhooks-logs";
import { WebhooksMainMenu } from "./webhooks-main-menu";
import { WebhooksJsonViewer, WebhooksSamplesList } from "./webhooks-samples";
import { WebhooksTrigger } from "./webhooks-trigger";
import { WebhooksUrlInput, type UrlInputMode } from "./webhooks-url-input";

function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

type ViewState =
  | "main"
  | "samples"
  | "json"
  | "listen"
  | "create"
  | "resend"
  | "logs"
  | "trigger";

interface ViewData {
  title: string;
  description: string;
  data: unknown;
}

export function WebhooksView() {
  // Navigation state
  const [view, setView] = useState<ViewState>("main");
  const [lastView, setLastView] = useState<ViewState>("main");
  const [viewData, setViewData] = useState<ViewData | null>(null);

  // Input state
  const [inputValue, setInputValue] = useState("");
  const [logLimit, setLogLimit] = useState("");
  const [logFormat, setLogFormat] = useState("");
  const [urlError, setUrlError] = useState<string | undefined>();

  // Navigation handlers
  const handleBack = () => {
    if (view === "json") {
      setView(lastView);
    } else {
      setView("main");
    }
    setUrlError(undefined);
  };

  // Main menu navigation
  const handleGoToCreate = () => {
    setInputValue("http://localhost:3000");
    setView("create");
  };

  const handleGoToListen = () => {
    setInputValue("http://localhost:3000");
    setView("listen");
  };

  const handleGoToTrigger = () => {
    setView("trigger");
  };

  const handleGoToResend = () => {
    setInputValue("");
    setView("resend");
  };

  const handleGoToLogs = () => {
    setLogLimit("");
    setLogFormat("table");
    setView("logs");
  };

  const handleGoToSamples = () => {
    setView("samples");
  };

  // URL Input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (urlError) {
      setUrlError(undefined);
    }
  };

  const handleUrlSubmit = () => {
    if (view === "resend") {
      if (!inputValue.trim()) {
        setUrlError("O ID do evento é obrigatório");
        return;
      }
      setUrlError(undefined);
      handleResendEvent(inputValue);
      return;
    }

    if (!validateUrl(inputValue)) {
      setUrlError("URL inválida. Use o formato: http://localhost:3000");
      return;
    }
    setUrlError(undefined);

    if (view === "create") {
      // @ts-ignore
      handleCreateWebhook(inputValue);
    } else {
      handleWebhookListen(inputValue);
    }
  };

  // Logs handlers
  const handleLogLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogLimit(e.target.value);
  };

  const handleLogFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLogFormat(e.target.value);
  };

  const handleLogsSubmit = () => {
    handleListLogs(logLimit, logFormat);
  };

  // Trigger handler
  const handleDoTrigger = (event: string) => {
    handleTriggerEvent(event);
  };

  // Samples handlers
  const handleSelectSample = (event: SampleEventType) => {
    setViewData({
      title: event,
      description: "Exemplo de payload JSON",
      data: SAMPLE_EVENTS[event],
    });
    setLastView("samples");
    setView("json");
  };

  // Render based on view state
  if (view === "logs") {
    return (
      <WebhooksLogs
        logLimit={logLimit}
        logFormat={logFormat}
        onLogLimitChange={handleLogLimitChange}
        onLogFormatChange={handleLogFormatChange}
        onSubmit={handleLogsSubmit}
        onBack={handleBack}
      />
    );
  }

  if (view === "trigger") {
    return <WebhooksTrigger onTrigger={handleDoTrigger} onBack={handleBack} />;
  }

  if (view === "listen" || view === "create" || view === "resend") {
    return (
      <WebhooksUrlInput
        mode={view as UrlInputMode}
        inputValue={inputValue}
        urlError={urlError}
        onInputChange={handleInputChange}
        onSubmit={handleUrlSubmit}
        onBack={handleBack}
      />
    );
  }

  if (view === "samples") {
    return (
      <WebhooksSamplesList
        onSelectSample={handleSelectSample}
        onBack={handleBack}
      />
    );
  }

  if (view === "json" && viewData) {
    return (
      <WebhooksJsonViewer
        title={viewData.title}
        description={viewData.description}
        data={viewData.data}
        onBack={handleBack}
      />
    );
  }

  return (
    <WebhooksMainMenu
      onCreateWebhook={handleGoToCreate}
      onListenWebhooks={handleGoToListen}
      onTriggerEvent={handleGoToTrigger}
      onResendEvent={handleGoToResend}
      onHistoryLogs={handleGoToLogs}
      onSamples={handleGoToSamples}
    />
  );
}
