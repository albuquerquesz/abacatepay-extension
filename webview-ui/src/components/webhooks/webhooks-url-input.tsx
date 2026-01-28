import { Button, Input, ViewLayout } from "../ui";

export type UrlInputMode = "listen" | "create" | "resend";

interface WebhooksUrlInputProps {
  mode: UrlInputMode;
  inputValue: string;
  urlError?: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const CONFIG: Record<
  UrlInputMode,
  {
    title: string;
    description: string;
    buttonText: string;
    placeholder: string;
    inputType: "url" | "text";
  }
> = {
  listen: {
    title: "Ouvir Webhooks",
    description: "Informe a URL para encaminhar os webhooks",
    buttonText: "Iniciar Escuta",
    placeholder: "http://localhost:3000",
    inputType: "url",
  },
  create: {
    title: "Criar Webhook",
    description: "Informe a URL para onde os eventos serão enviados",
    buttonText: "Criar Webhook",
    placeholder: "http://localhost:3000",
    inputType: "url",
  },
  resend: {
    title: "Reenviar Evento",
    description: "Informe o ID do evento para reenvio local",
    buttonText: "Reenviar Evento",
    placeholder: "evt_...",
    inputType: "text",
  },
};

export function WebhooksUrlInput({
  mode,
  inputValue,
  urlError,
  onInputChange,
  onSubmit,
  onBack,
}: WebhooksUrlInputProps) {
  const config = CONFIG[mode];

  return (
    <ViewLayout
      title={config.title}
      description={config.description}
      onBack={onBack}
    >
      <div className="space-y-4">
        <Input
          type={config.inputType}
          placeholder={config.placeholder}
          value={inputValue}
          onChange={onInputChange}
          error={urlError}
        />
        <Button className="w-full" onClick={onSubmit}>
          {config.buttonText}
        </Button>
      </div>
    </ViewLayout>
  );
}
