import { useState } from "react";
import { api } from "../../services/bridge-api";
import { vscode } from "../../utils/vscode";
import { handleCheckPayment } from "../../functions/billing-handlers";
import { Button, Input, MenuList, type MenuOption, ViewLayout } from "../ui";

type BillingViewState =
  | "main"
  | "pix-setup"
  | "pix-manual"
  | "checkout-setup"
  | "checkout-manual"
  | "check-payment";

export function BillingView() {
  const [view, setView] = useState<BillingViewState>("main");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    customerName: "",
    customerEmail: "",
    customerTaxId: "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleManualPix = () => {
    setView("pix-manual");
  };

  const handleRandomPix = () => {
    console.log("Random Pix selected");
    vscode.postMessage({
      command: "run-terminal",
      payload: {
        command: "abacate create pix",
      },
    });
  };

  const handleManualCheckout = () => {
    setView("checkout-manual");
  };

  const handleRandomCheckout = () => {
    console.log("Random Checkout selected");
    vscode.postMessage({
      command: "run-terminal",
      payload: {
        command: "abacate create checkout",
      },
    });
  };

  const handleDoCheckPayment = () => {
    if (!paymentId.trim()) {
      vscode.postMessage({
        command: "showError",
        data: "O ID do pagamento é obrigatório",
      });
      return;
    }
    handleCheckPayment(paymentId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const isCheckout = view === "checkout-manual";
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
      setView("main");
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

  const mainOptions: MenuOption[] = [
    {
      label: "Criar Pix QRCode",
      description: "Gere um QRCode estático ou dinâmico para Pix",
      onClick: () => setView("pix-setup"),
    },
    {
      label: "Criar Checkout",
      description: "Página de pagamento segura e otimizada",
      onClick: () => setView("checkout-setup"),
    },
    {
      label: "Checar Pagamento",
      description: "Consulte o status de uma cobrança existente",
      onClick: () => {
        setPaymentId("");
        setView("check-payment");
      },
    },
  ];

  const pixOptions: MenuOption[] = [
    {
      label: "Preenchimento Manual",
      description: "Defina valor, cliente e descrição da cobrança",
      onClick: handleManualPix,
    },
    {
      label: "Gerar com Dados Aleatórios",
      description: "Crie um Pix instantâneo para fins de teste",
      onClick: handleRandomPix,
    },
  ];

  const checkoutOptions: MenuOption[] = [
    {
      label: "Preenchimento Manual",
      description: "Defina os detalhes do produto e cliente",
      onClick: handleManualCheckout,
    },
    {
      label: "Gerar com Dados Aleatórios",
      description: "Crie um Checkout instantâneo para fins de teste",
      onClick: handleRandomCheckout,
    },
  ];

  if (view === "check-payment") {
    return (
      <ViewLayout
        title="Checar Pagamento"
        description="Informe o ID da cobrança para verificar o status"
        onBack={() => setView("main")}
      >
        <div className="space-y-4">
          <Input
            label="ID do Pagamento"
            placeholder="Ex: bill_..."
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
          />
          <Button className="w-full" onClick={handleDoCheckPayment}>
            Verificar no Terminal
          </Button>
        </div>
      </ViewLayout>
    );
  }

  if (view === "pix-manual" || view === "checkout-manual") {
    const isCheckout = view === "checkout-manual";
    return (
      <ViewLayout
        title={isCheckout ? "Novo Checkout" : "Novo Pix"}
        description="Preencha os dados da cobrança"
        onBack={() => setView(isCheckout ? "checkout-setup" : "pix-setup")}
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
              onChange={(e) =>
                handleInputChange("customerName", e.target.value)
              }
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
              onChange={(e) =>
                handleInputChange("customerEmail", e.target.value)
              }
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
              onChange={(e) =>
                handleInputChange("customerTaxId", e.target.value)
              }
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

  if (view === "pix-setup") {
    return (
      <ViewLayout
        title="Criar Pix"
        description="Como deseja gerar a cobrança?"
        onBack={() => setView("main")}
      >
        <MenuList options={pixOptions} />
      </ViewLayout>
    );
  }

  if (view === "checkout-setup") {
    return (
      <ViewLayout
        title="Criar Checkout"
        description="Como deseja gerar o pagamento?"
        onBack={() => setView("main")}
      >
        <MenuList options={checkoutOptions} />
      </ViewLayout>
    );
  }

  return (
    <ViewLayout
      title="Billing"
      description="Gerencie cobranças e pagamentos de forma simples"
    >
      <MenuList options={mainOptions} />
    </ViewLayout>
  );
}

