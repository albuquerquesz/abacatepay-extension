import { useState } from "react";
import {
  handleCreateWebhook,
  handleListWebhooks,
  handleWebhookListen,
} from "../../functions/webhook-handlers";
import {
  SAMPLE_EVENTS,
  type SampleEventType,
} from "../../functions/webhook-samples";
import { JsonViewer, MenuList, type MenuOption, ViewLayout } from "../ui";

export function WebhooksView() {
  const [view, setView] = useState<"main" | "samples" | "json">("main");
  const [selectedEvent, setSelectedEvent] = useState<SampleEventType | null>(
    null,
  );

  const handleSelectSample = (event: SampleEventType) => {
    setSelectedEvent(event);
    setView("json");
  };

  const handleBack = () => {
    setView("main");

    if (view === "json") {
      setView("samples");
    }
  };

  const mainOptions: MenuOption[] = [
    {
      label: "Criar Webhook",
      description: "Configure um novo endpoint de notificação",
      onClick: handleCreateWebhook,
    },
    {
      label: "Listar Webhooks",
      description: "Visualize e gerencie seus webhooks ativos",
      onClick: handleListWebhooks,
    },
    {
      label: "Ouvir Webhooks",
      description: "Ouça webhooks e encaminhe para seu app local",
      onClick: handleWebhookListen,
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
