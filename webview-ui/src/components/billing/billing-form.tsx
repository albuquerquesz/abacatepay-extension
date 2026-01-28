import { useState } from "react";
import { api } from "../../services/bridge-api";
import { vscode } from "../../utils/vscode";
import { Button, Input, ViewLayout } from "../ui";

interface BillingFormProps {
  type: "pix" | "checkout";
  onBack: () => void;
  onSuccess: () => void;
}

interface FormData {
  amount: string;
  description: string;
  customerName: string;
  customerEmail: string;
  customerTaxId: string;
}

export function BillingForm({ type, onBack, onSuccess }: BillingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    description: "",
    customerName: "",
    customerEmail: "",
    customerTaxId: "",
  });

  const isCheckout = type === "checkout";

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isCheckout ? "/billing/create" : "/pixQrCode/create";

    try {
      const result = await api.post(endpoint, {
        amount: Number(formData.amount),
        description: formData.description,
        methods: isCheckout ? ["PIX", "CREDIT_CARD"] : ["PIX"],
        customer: {
          name: formData.customerName,
          email: formData.customerEmail,
          taxId: formData.customerTaxId,
        },
      });

      console.log(
        `${isCheckout ? "Checkout" : "Pix"} gerado com sucesso:`,
        result,
      );
      vscode.postMessage({
        command: "showInfo",
        data: `${isCheckout ? "Checkout" : "Cobrança Pix"} gerada com sucesso!`,
      });
      onSuccess();
    } catch (error: any) {
      console.error(`Erro ao gerar ${isCheckout ? "Checkout" : "Pix"}:`, error);
      vscode.postMessage({
        command: "showError",
        data: `Erro ao gerar ${isCheckout ? "Checkout" : "Pix"}: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ViewLayout
      title={isCheckout ? "Novo Checkout" : "Novo Pix"}
      description="Preencha os dados da cobrança"
      onBack={onBack}
    >
      <form className="space-y-4 pb-8" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-medium text-vscode-fg/70">
            Valor (em centavos)
          </label>
          <Input
            type="number"
            placeholder="Ex: 1000 (para R$ 10,00)"
            value={formData.amount}
            onChange={(e) => handleInputChange("amount", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-vscode-fg/70">
            Descrição do Produto
          </label>
          <Input
            placeholder="Ex: Camiseta Algodão"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-vscode-fg/70">
            Nome do Cliente
          </label>
          <Input
            placeholder="Ex: João da Silva"
            value={formData.customerName}
            onChange={(e) => handleInputChange("customerName", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-vscode-fg/70">
            E-mail do Cliente
          </label>
          <Input
            type="email"
            placeholder="joao@email.com"
            value={formData.customerEmail}
            onChange={(e) => handleInputChange("customerEmail", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-vscode-fg/70">
            Tax ID (CPF ou CNPJ)
          </label>
          <Input
            placeholder="000.000.000-00"
            value={formData.customerTaxId}
            onChange={(e) => handleInputChange("customerTaxId", e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          {isLoading
            ? "Gerando..."
            : `Gerar ${isCheckout ? "Checkout" : "Cobrança Pix"}`}
        </Button>
      </form>
    </ViewLayout>
  );
}
