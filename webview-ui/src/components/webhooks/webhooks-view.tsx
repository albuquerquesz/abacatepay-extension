import { useState } from "react";
import {
  handleCreateWebhook,
  handleWebhookListen,
} from "../../functions/webhook-handlers";
import {
  SAMPLE_EVENTS,
  type SampleEventType,
} from "../../functions/webhook-samples";
import {
  Button,
  Input,
  JsonViewer,
  MenuList,
  type MenuOption,
  ViewLayout,
} from "../ui";

function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

type ViewState = "main" | "samples" | "json" | "listen";

export function WebhooksView() {
  const [view, setView] = useState<ViewState>("main");
  const [selectedEvent, setSelectedEvent] = useState<SampleEventType | null>(
    null,
  );
  const [forwardUrl, setForwardUrl] = useState("http://localhost:3000");
  const [urlError, setUrlError] = useState<string | undefined>();

  const handleSelectSample = (event: SampleEventType) => {
    setSelectedEvent(event);
    setView("json");
  };

  const handleBack = () => {
    setView("main");
    if (view === "json") {
      setView("samples");
    }

    setUrlError(undefined);
  };

  const handleStartListen = () => {
    if (!validateUrl(forwardUrl)) {
      setUrlError("URL inválida. Use o formato: http://localhost:3000");
      return;
    }
    setUrlError(undefined);
    handleWebhookListen(forwardUrl);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForwardUrl(e.target.value);
    if (urlError) {
      setUrlError(undefined);
    }
  };

  const mainOptions: MenuOption[] = [
    {
      label: "Criar Webhook",
      description: "Configure um novo endpoint de notificação",
      onClick: handleCreateWebhook,
    },
    {
      label: "Ouvir Webhooks",
      description: "Ouça webhooks e encaminhe para seu app local",
      onClick: () => setView("listen"),
    },
    {
      label: "Exemplos de JSON",
      description: "Visualize payloads de eventos suportados",
      onClick: () => setView("samples"),
    },
  ];

  const sampleOptions: MenuOption[] = (
    Object.keys(SAMPLE_EVENTS) as SampleEventType[]
  ).map((event) => ({
    label: event,
    description: `Exemplo de payload para ${event}`,
    onClick: () => handleSelectSample(event),
  }));

  if (view === "listen") {
    return (
      <ViewLayout
        title="Ouvir Webhooks"
        description="Informe a URL para encaminhar os webhooks"
        onBack={handleBack}
      >
        <div className="space-y-4">
          <Input
            type="url"
            placeholder="http://localhost:3000"
            value={forwardUrl}
            onChange={handleUrlChange}
            error={urlError}
          />
          <Button className="w-full" onClick={handleStartListen}>
            Iniciar Escuta
          </Button>
        </div>
      </ViewLayout>
    );
  }

  if (view === "samples") {
    return (
      <ViewLayout
        title="Exemplos de JSON"
        description="Selecione um evento para visualizar o payload"
        onBack={handleBack}
      >
        <MenuList options={sampleOptions} />
      </ViewLayout>
    );
  }

  if (view === "json" && selectedEvent) {
    return (
      <ViewLayout
        title={selectedEvent}
        description="Exemplo de payload JSON"
        onBack={handleBack}
      >
        <JsonViewer data={SAMPLE_EVENTS[selectedEvent]} />
      </ViewLayout>
    );
  }

  return (
    <ViewLayout
      title="Webhooks"
      description="Configure seus endpoints de notificação"
    >
      <MenuList options={mainOptions} />
    </ViewLayout>
  );
}
