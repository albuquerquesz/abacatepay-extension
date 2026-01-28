import { MenuList, type MenuOption, ViewLayout } from "../ui";

interface WebhooksMainMenuProps {
  onCreateWebhook: () => void;
  onListenWebhooks: () => void;
  onTriggerEvent: () => void;
  onResendEvent: () => void;
  onHistoryLogs: () => void;
  onSamples: () => void;
}

export function WebhooksMainMenu({
  onCreateWebhook,
  onListenWebhooks,
  onTriggerEvent,
  onResendEvent,
  onHistoryLogs,
  onSamples,
}: WebhooksMainMenuProps) {
  const mainOptions: MenuOption[] = [
    {
      label: "Criar Webhook",
      description: "Configure um novo endpoint de notificação",
      onClick: onCreateWebhook,
    },
    {
      label: "Ouvir Webhooks",
      description: "Ouça webhooks e encaminhe para seu app local",
      onClick: onListenWebhooks,
    },
    {
      label: "Simular Evento (Trigger)",
      description: "Dispare um evento de teste para seus webhooks",
      onClick: onTriggerEvent,
    },
    {
      label: "Reenviar Evento",
      description: "Reenvie um evento passado para seu endpoint local",
      onClick: onResendEvent,
    },
    {
      label: "Histórico de Eventos",
      description: "Visualize os últimos eventos recebidos",
      onClick: onHistoryLogs,
    },
    {
      label: "Exemplos de JSON",
      description: "Visualize payloads de eventos suportados",
      onClick: onSamples,
    },
  ];

  return (
    <ViewLayout
      title="Webhooks"
      description="Configure seus endpoints de notificação"
    >
      <MenuList options={mainOptions} />
    </ViewLayout>
  );
}
