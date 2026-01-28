import { Button, Input, Select, ViewLayout } from "../ui";

interface WebhooksLogsProps {
  logLimit: string;
  logFormat: string;
  onLogLimitChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogFormatChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function WebhooksLogs({
  logLimit,
  logFormat,
  onLogLimitChange,
  onLogFormatChange,
  onSubmit,
  onBack,
}: WebhooksLogsProps) {
  return (
    <ViewLayout
      title="Histórico de Eventos"
      description="Configure os parâmetros para listar os logs no terminal (opcional)"
      onBack={onBack}
    >
      <div className="space-y-4">
        <Input
          type="number"
          label="Limite (Opcional)"
          placeholder="Ex: 10"
          value={logLimit}
          onChange={onLogLimitChange}
        />

        <Select
          label="Formato de Saída (Opcional)"
          value={logFormat}
          onChange={onLogFormatChange}
          options={[
            { label: "Padrão (Tabela)", value: "" },
            { label: "Tabela", value: "table" },
            { label: "JSON", value: "json" },
          ]}
        />

        <Button className="w-full" onClick={onSubmit}>
          Executar no Terminal
        </Button>

        <p className="text-[10px] text-vscode-foreground opacity-50 text-center italic">
          Se nenhum campo for preenchido, será executado: abacate logs list
        </p>
      </div>
    </ViewLayout>
  );
}
