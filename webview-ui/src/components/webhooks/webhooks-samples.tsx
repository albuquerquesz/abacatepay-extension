import {
  SAMPLE_EVENTS,
  type SampleEventType,
} from "../../functions/webhook-samples";
import { JsonViewer, MenuList, type MenuOption, ViewLayout } from "../ui";

interface WebhooksSamplesListProps {
  onSelectSample: (event: SampleEventType) => void;
  onBack: () => void;
}

export function WebhooksSamplesList({
  onSelectSample,
  onBack,
}: WebhooksSamplesListProps) {
  const sampleOptions: MenuOption[] = (
    Object.keys(SAMPLE_EVENTS) as SampleEventType[]
  ).map((event) => ({
    label: event,
    description: `Exemplo de payload para ${event}`,
    onClick: () => onSelectSample(event),
  }));

  return (
    <ViewLayout
      title="Exemplos de JSON"
      description="Selecione um evento para visualizar o payload"
      onBack={onBack}
    >
      <MenuList options={sampleOptions} />
    </ViewLayout>
  );
}

interface WebhooksJsonViewerProps {
  title: string;
  description: string;
  data: unknown;
  onBack: () => void;
}

export function WebhooksJsonViewer({
  title,
  description,
  data,
  onBack,
}: WebhooksJsonViewerProps) {
  return (
    <ViewLayout title={title} description={description} onBack={onBack}>
      <JsonViewer data={data} />
    </ViewLayout>
  );
}
