import {
  SAMPLE_EVENTS,
  type SampleEventType,
} from "../../functions/webhook-samples";
import { MenuList, type MenuOption, ViewLayout } from "../ui";

interface WebhooksTriggerProps {
  onTrigger: (event: string) => void;
  onBack: () => void;
}

export function WebhooksTrigger({ onTrigger, onBack }: WebhooksTriggerProps) {
  const triggerOptions: MenuOption[] = (
    Object.keys(SAMPLE_EVENTS) as SampleEventType[]
  ).map((event) => ({
    label: event,
    description: `Disparar evento ${event}`,
    onClick: () => onTrigger(event),
  }));

  return (
    <ViewLayout
      title="Simular Evento"
      description="Escolha um evento para disparar no terminal"
      onBack={onBack}
    >
      <MenuList options={triggerOptions} />
    </ViewLayout>
  );
}
