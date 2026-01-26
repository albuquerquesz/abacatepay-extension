import { ReceiptText } from "lucide-react";

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

export function BillingView() {
  const handleCreatePixQRCode = () => {
    console.log("Criar Pix QRCode");
  };

  const handleCreateCheckout = () => {
    console.log("Criar Checkout");
  };

  return (
    <div className="flex flex-col h-full bg-vscode-bg text-vscode-fg p-5">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-abacate-primary flex items-center gap-2">
          <ReceiptText size={22} strokeWidth={2.5} />
          Billing
        </h1>
        <p className="text-xs text-vscode-fg/50 mt-1 ml-8">
          Gerencie cobranças e pagamentos de forma simples
        </p>
      </div>

      <div className="space-y-3">
        <MenuItem
          label="Criar Pix QRCode"
          description="Gere um QRCode estático ou dinâmico para Pix"
          onClick={handleCreatePixQRCode}
        />
        <MenuItem
          label="Criar Checkout"
          description="Página de pagamento segura e otimizada"
          onClick={handleCreateCheckout}
        />
      </div>
    </div>
  );
}
