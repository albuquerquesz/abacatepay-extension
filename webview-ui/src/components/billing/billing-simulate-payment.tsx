import { useState } from "react";
import { api } from "../../services/bridge-api";
import { vscode } from "../../utils/vscode";
import { Button, Input, JsonViewer, ViewLayout } from "../ui";

interface BillingSimulatePaymentProps {
  onBack: () => void;
}

export function BillingSimulatePayment({ onBack }: BillingSimulatePaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [simulateResult, setSimulateResult] = useState<any>(null);

  const handleDoSimulatePayment = async () => {
    if (!paymentId.trim()) {
      vscode.postMessage({
        command: "showError",
        data: "O ID do pagamento é obrigatório",
      });
      return;
    }

    setIsLoading(true);
    setSimulateResult(null);

    try {
      const result = await api.post("/pixQrCode/simulate-payment", { id: paymentId });
      setSimulateResult(result);
      vscode.postMessage({
        command: "showInfo",
        data: "Pagamento simulado com sucesso!",
      });
    } catch (error: any) {
      vscode.postMessage({
        command: "showError",
        data: `Erro ao simular pagamento: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (simulateResult) {
      setSimulateResult(null);
      return;
    }
    onBack();
  };

  if (simulateResult) {
    return (
      <ViewLayout
        title="Simular Pagamento"
        description="Resultado da simulação de pagamento"
        onBack={handleBack}
      >
        <div className="space-y-4 animate-fade-in">
          <JsonViewer data={simulateResult} />
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setSimulateResult(null)}
          >
            Nova Simulação
          </Button>
        </div>
      </ViewLayout>
    );
  }

  return (
    <ViewLayout
      title="Simular Pagamento"
      description="Informe o ID da cobrança para simular o pagamento"
      onBack={handleBack}
    >
      <div className="space-y-4">
        <Input
          label="ID do Pagamento"
          placeholder="Ex: bill_..."
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
          disabled={isLoading}
        />
        <Button
          className="w-full"
          onClick={handleDoSimulatePayment}
          disabled={isLoading}
        >
          {isLoading ? "Simulando..." : "Simular Pagamento"}
        </Button>
      </div>
    </ViewLayout>
  );
}
