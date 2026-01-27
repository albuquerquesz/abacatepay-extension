import { useState } from "react";
import {
  handleCreateWebhook,
  handleResendEvent,
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

type ViewState = "main" | "samples" | "json" | "listen" | "create" | "history" | "resend";

interface ViewData {
  title: string;
  description: string;
  data: unknown;
}

// Mock history data using existing samples
const MOCK_HISTORY = [
  {
    id: "evt_1",
    type: "billing.paid",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
    payload: SAMPLE_EVENTS["billing.paid"],
  },
  {
    id: "evt_2",
    type: "payouts.done",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    payload: SAMPLE_EVENTS["payouts.done"],
  },
  {
    id: "evt_3",
    type: "payouts.failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    payload: SAMPLE_EVENTS["payouts.failed"],
  },
];

export function WebhooksView() {
  const [view, setView] = useState<ViewState>("main");
  const [lastView, setLastView] = useState<ViewState>("main");
  const [viewData, setViewData] = useState<ViewData | null>(null);
  
  const [inputValue, setInputValue] = useState("");
  const [urlError, setUrlError] = useState<string | undefined>();

  const handleSelectSample = (event: SampleEventType) => {
    setViewData({
      title: event,
      description: "Exemplo de payload JSON",
      data: SAMPLE_EVENTS[event],
    });
    setLastView("samples");
    setView("json");
  };

  const handleSelectHistoryItem = (item: typeof MOCK_HISTORY[0]) => {
    setViewData({
      title: item.type,
      description: `Recebido em ${new Date(item.timestamp).toLocaleString()}`,
      data: item.payload,
    });
    setLastView("history");
    setView("json");
  };

  const handleBack = () => {
    if (view === "json") {
      setView(lastView);
    } else {
      setView("main");
    }
    setUrlError(undefined);
  };

  const handleStartListen = () => {
    if (!validateUrl(inputValue)) {
      setUrlError("URL inválida. Use o formato: http://localhost:3000");
      return;
    }
    setUrlError(undefined);
    handleWebhookListen(inputValue);
  };

  const handleStartCreate = () => {
    if (!validateUrl(inputValue)) {
      setUrlError("URL inválida. Use o formato: http://localhost:3000");
      return;
    }
    setUrlError(undefined);
    // @ts-ignore
    handleCreateWebhook(inputValue);
  };

  const handleDoResend = () => {
    if (!inputValue.trim()) {
      setUrlError("O ID do evento é obrigatório");
      return;
    }
    setUrlError(undefined);
    handleResendEvent(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (urlError) {
      setUrlError(undefined);
    }
  };

  const mainOptions: MenuOption[] = [
    {
      label: "Criar Webhook",
      description: "Configure um novo endpoint de notificação",
      onClick: () => {
        setInputValue("http://localhost:3000");
        setView("create");
      },
    },
    {
      label: "Ouvir Webhooks",
      description: "Ouça webhooks e encaminhe para seu app local",
      onClick: () => {
        setInputValue("http://localhost:3000");
        setView("listen");
      },
    },
    {
      label: "Reenviar Evento",
      description: "Reenvie um evento passado para seu endpoint local",
      onClick: () => {
        setInputValue("");
        setView("resend");
      },
    },
    {
      label: "Histórico de Eventos",
      description: "Visualize os últimos eventos recebidos",
      onClick: () => setView("history"),
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

  const historyOptions: MenuOption[] = MOCK_HISTORY.map((item) => ({
    label: item.type,
    description: new Date(item.timestamp).toLocaleString(),
    onClick: () => handleSelectHistoryItem(item),
  }));

  if (view === "listen" || view === "create" || view === "resend") {
    const isCreate = view === "create";
    const isResend = view === "resend";
    
    let title = "Ouvir Webhooks";
    let description = "Informe a URL para encaminhar os webhooks";
    let buttonText = "Iniciar Escuta";
    let placeholder = "http://localhost:3000";
    let action = handleStartListen;

    if (isCreate) {
      title = "Criar Webhook";
      description = "Informe a URL para onde os eventos serão enviados";
      buttonText = "Criar Webhook";
      action = handleStartCreate;
    } else if (isResend) {
      title = "Reenviar Evento";
      description = "Informe o ID do evento para reenvio local";
      buttonText = "Reenviar Evento";
      placeholder = "evt_...";
      action = handleDoResend;
    }

    return (
      <ViewLayout
        title={title}
        description={description}
        onBack={handleBack}
      >
        <div className="space-y-4">
          <Input
            type={isResend ? "text" : "url"}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            error={urlError}
          />
          <Button
            className="w-full"
            onClick={action}
          >
            {buttonText}
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

  if (view === "history") {
    return (
      <ViewLayout
        title="Histórico de Eventos"
        description="Últimos eventos processados"
        onBack={handleBack}
      >
        <MenuList options={historyOptions} />
      </ViewLayout>
    );
  }

  if (view === "json" && viewData) {
    return (
      <ViewLayout
        title={viewData.title}
        description={viewData.description}
        onBack={handleBack}
      >
        <JsonViewer data={viewData.data} />
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