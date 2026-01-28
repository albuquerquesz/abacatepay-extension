import { MenuList, type MenuOption, ViewLayout } from "../ui";

interface BillingSetupMenuProps {
  type: "pix" | "checkout";
  onManual: () => void;
  onRandom: () => void;
  onBack: () => void;
}

export function BillingSetupMenu({
  type,
  onManual,
  onRandom,
  onBack,
}: BillingSetupMenuProps) {
  const isPix = type === "pix";

  const options: MenuOption[] = [
    {
      label: "Preenchimento Manual",
      description: isPix
        ? "Defina valor, cliente e descrição da cobrança"
        : "Defina os detalhes do produto e cliente",
      onClick: onManual,
    },
    {
      label: "Gerar com Dados Aleatórios",
      description: isPix
        ? "Crie um Pix instantâneo para fins de teste"
        : "Crie um Checkout instantâneo para fins de teste",
      onClick: onRandom,
    },
  ];

  return (
    <ViewLayout
      title={isPix ? "Criar Pix" : "Criar Checkout"}
      description="Como deseja gerar a cobrança?"
      onBack={onBack}
    >
      <MenuList options={options} />
    </ViewLayout>
  );
}
