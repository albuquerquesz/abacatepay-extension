import { useState } from "react";
import {
  handleCreateWebhook,
  handleListLogs,
  handleResendEvent,
  handleWebhookListen,
} from "../../functions/webhook-handlers";
import {
  MOCK_HISTORY,
  SAMPLE_EVENTS,
  type SampleEventType,
} from "../../functions/webhook-samples";
import {
  Button,
  HistoryItem,
  Input,
  JsonViewer,
  MenuList,
  type MenuOption,
  Select,
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

type ViewState =
  | "main"
  | "samples"
  | "json"
  | "listen"
  | "create"
  | "history"
  | "resend"
  | "logs";

interface ViewData {
  title: string;
  description: string;
  data: unknown;
}

export function WebhooksView() {
  const [view, setView] = useState<ViewState>("main");
  const [lastView, setLastView] = useState<ViewState>("main");
  const [viewData, setViewData] = useState<ViewData | null>(null);

  const [inputValue, setInputValue] = useState("");
  const [logLimit, setLogLimit] = useState("");
  const [logFormat, setLogFormat] = useState("table");
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

  const handleSelectHistoryItem = (item: (typeof MOCK_HISTORY)[0]) => {
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

  const handleDoListLogs = () => {
    handleListLogs(logLimit, logFormat);
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
      onClick: () => {
        setLogLimit("");
        setLogFormat("table");
        setView("logs");
      },
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

  if (view === "logs") {
    return (
      <ViewLayout
        title="Visualizar Logs"
        description="Configure os parâmetros para listar os logs no terminal (opcional)"
        onBack={handleBack}
      >
        <div className="space-y-4">
          <Input
            type="number"
            label="Limite (Opcional)"
            placeholder="Ex: 10"
            value={logLimit}
            onChange={(e) => setLogLimit(e.target.value)}
          />

          <Select
            label="Formato de Saída (Opcional)"
            value={logFormat}
            onChange={(e) => setLogFormat(e.target.value)}
            options={[
              { label: "Tabela", value: "table" },
              { label: "JSON", value: "json" },
            ]}
          />

          <Button className="w-full" onClick={handleDoListLogs}>
            Executar no Terminal
          </Button>

          <p className="text-[10px] text-vscode-foreground opacity-50 text-center italic">
            Se nenhum campo for preenchido, será executado: abacate logs list
          </p>
        </div>
      </ViewLayout>
    );
  }

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
      <ViewLayout title={title} description={description} onBack={handleBack}>
        <div className="space-y-4">
          <Input
            type={isResend ? "text" : "url"}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            error={urlError}
          />
          <Button className="w-full" onClick={action}>
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
        <div className="space-y-3">
          {MOCK_HISTORY.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              onClick={() => handleSelectHistoryItem(item)}
            />
          ))}
        </div>
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

