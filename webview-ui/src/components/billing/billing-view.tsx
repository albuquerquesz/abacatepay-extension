import { QrCode, CreditCard, ReceiptText } from "lucide-react";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}

function MenuItem({ icon, label, description, onClick }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-xl bg-black/30 hover:bg-abacate-primary/10 border border-white/5 hover:border-abacate-primary/30 transition-all cursor-pointer text-left group"
    >
      <div className="text-vscode-fg/70 group-hover:text-abacate-primary transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-vscode-fg group-hover:text-abacate-primary transition-colors">{label}</h3>
        <p className="text-xs text-vscode-fg/50 line-clamp-1">{description}</p>
      </div>
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
          <ReceiptText size={24} strokeWidth={2.5} />
          Billing
        </h1>
        <p className="text-xs text-vscode-fg/50 mt-1 ml-8">
          Gerencie cobranças e pagamentos de forma simples
        </p>
      </div>

      <div className="space-y-3">
        <MenuItem
          icon={<QrCode size={22} strokeWidth={1.5} />}
          label="Criar Pix QRCode"
          description="Gere um QRCode estático ou dinâmico para Pix"
          onClick={handleCreatePixQRCode}
        />
        <MenuItem
          icon={<CreditCard size={22} strokeWidth={1.5} />}
          label="Criar Checkout"
          description="Página de pagamento segura e otimizada"
          onClick={handleCreateCheckout}
        />
      </div>
    </div>
  );
}
