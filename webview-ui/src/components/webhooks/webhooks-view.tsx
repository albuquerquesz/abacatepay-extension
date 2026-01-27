import { useState } from "react";
import { Button } from "../ui/button";

interface MenuItemProps {
  label: string;
  description: string;
  onClick: () => void;
}

function MenuItem({ label, description, onClick }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex flex-col gap-1 p-4 rounded-xl transition-all cursor-pointer text-left group
				vsc-dark:bg-black/40 vsc-dark:border-white/5
				vsc-light:bg-vscode-input-bg vsc-light:border-vscode-input-border
				hover:bg-abacate-primary/10 hover:border-abacate-primary/30"
    >
      <h3 className="text-sm font-semibold text-vscode-fg group-hover:text-abacate-primary transition-colors">
        {label}
      </h3>
      <p className="text-xs text-vscode-fg/50 line-clamp-1">{description}</p>
    </button>
  );
}

const SAMPLE_EVENTS = {
  "billing.paid": {
    event: "billing.paid",
    data: {
      id: "bill_123456789",
      status: "paid",
      amount: 2990,
      customer: {
        name: "John Doe",
        email: "john@example.com",
      },
    },
  },
  "payouts.done": {
    event: "payouts.done",
    data: {
      id: "pay_123456789",
      status: "done",
      amount: 5000,
      bankAccount: {
        bank: "001",
        branch: "1234",
        account: "12345-6",
      },
    },
  },
  "payouts.failed": {
    event: "payouts.failed",
    data: {
      id: "pay_987654321",
      status: "failed",
      amount: 5000,
      failureReason: "invalid_account",
    },
  },
};

type SampleEventType = keyof typeof SAMPLE_EVENTS;

export function WebhooksView() {
  const [view, setView] = useState<"main" | "samples" | "json">("main");
  const [selectedEvent, setSelectedEvent] = useState<SampleEventType | null>(
    null
  );

  const handleCreateWebhook = () => {
    console.log("Criar Webhook");
  };

  const handleListWebhooks = () => {
    console.log("Listar Webhooks");
  };

  const handleWebhookListen = () => {
    console.log("Escutar Webhooks");
  };

  const handleShowSamples = () => {
    setView("samples");
  };

  const handleSelectSample = (event: SampleEventType) => {
    setSelectedEvent(event);
    setView("json");
  };

  const handleBack = () => {
    if (view === "json") {
      setView("samples");
    } else {
      setView("main");
    }
  };

  const options = [
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
      onClick: handleShowSamples,
    },
  ];

  if (view === "samples") {
    return (
      <div className="flex flex-col h-full bg-vscode-bg text-vscode-fg p-5">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} className="mb-2 -ml-2">
            ← Voltar
          </Button>
          <h1 className="text-xl font-bold text-vscode-fg">Exemplos de JSON</h1>
          <p className="text-xs text-vscode-fg/50 mt-1">
            Selecione um evento para visualizar o payload
          </p>
        </div>

        <div className="space-y-3">
          {(Object.keys(SAMPLE_EVENTS) as SampleEventType[]).map((event) => (
            <MenuItem
              key={event}
              label={event}
              description={`Exemplo de payload para ${event}`}
              onClick={() => handleSelectSample(event)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (view === "json" && selectedEvent) {
    return (
      <div className="flex flex-col h-full bg-vscode-bg text-vscode-fg p-5">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} className="mb-2 -ml-2">
            ← Voltar
          </Button>
          <h1 className="text-xl font-bold text-vscode-fg">{selectedEvent}</h1>
          <p className="text-xs text-vscode-fg/50 mt-1">
            Exemplo de payload JSON
          </p>
        </div>

        <div className="bg-vscode-input-bg p-4 rounded-xl border border-vscode-input-border overflow-x-auto">
          <pre className="text-xs font-mono text-vscode-fg">
            {JSON.stringify(SAMPLE_EVENTS[selectedEvent], null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-vscode-bg text-vscode-fg p-5">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-vscode-fg flex items-center gap-2">
          Webhooks
        </h1>
        <p className="text-xs text-vscode-fg/50 mt-1">
          Configure seus endpoints de notificação
        </p>
      </div>

      <div className="space-y-3">
        {options.map((o) => (
          <MenuItem
            key={o.label}
            label={o.label}
            description={o.description}
            onClick={o.onClick}
          />
        ))}
      </div>
    </div>
  );
}