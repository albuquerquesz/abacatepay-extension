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

export function WebhooksView() {
  const handleCreateWebhook = () => {
    console.log("Criar Webhook");
  };

  const handleListWebhooks = () => {
    console.log("Listar Webhooks");
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
  ];

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
