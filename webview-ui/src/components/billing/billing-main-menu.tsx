import { MenuList, type MenuOption, ViewLayout } from "../ui";

interface BillingMainMenuProps {
  onPixSetup: () => void;
  onCheckoutSetup: () => void;
  onCheckPayment: () => void;
  onSimulatePayment: () => void;
}

export function BillingMainMenu({
  onPixSetup,
  onCheckoutSetup,
  onCheckPayment,
  onSimulatePayment,
}: BillingMainMenuProps) {
  const mainOptions: MenuOption[] = [
    {
      label: "Criar Pix QRCode",
      description: "Gere um QRCode estático ou dinâmico para Pix",
      onClick: onPixSetup,
    },
    {
      label: "Criar Checkout",
      description: "Página de pagamento segura e otimizada",
      onClick: onCheckoutSetup,
    },
    {
      label: "Checar Pagamento",
      description: "Consulte o status de uma cobrança existente",
      onClick: onCheckPayment,
    },
    {
      label: "Simular Pagamento",
      description: "Simule um pagamento PIX em ambiente de teste",
      onClick: onSimulatePayment,
    },
  ];

  return (
    <ViewLayout
      title="Billing"
      description="Gerencie cobranças e pagamentos de forma simples"
    >
      <MenuList options={mainOptions} />
    </ViewLayout>
  );
}
