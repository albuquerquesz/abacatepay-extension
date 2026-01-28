import { useState } from "react";
import { api } from "../../services/bridge-api";
import { vscode } from "../../utils/vscode";
import { Button, Input, JsonViewer, ViewLayout } from "../ui";

interface BillingCheckPaymentProps {
  onBack: () => void;
}

export function BillingCheckPayment({ onBack }: BillingCheckPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [checkResult, setCheckResult] = useState<any>(null);

  const handleDoCheckPayment = async () => {
    if (!paymentId.trim()) {
      vscode.postMessage({
        command: "showError",
        data: "O ID do pagamento é obrigatório",
      });
      return;
    }

    setIsLoading(true);
    setCheckResult(null);

    try {
      const result = await api.get(`/pixQrCode/check?id=${paymentId}`);
      setCheckResult(result);
      console.log("Resultado da checagem:", result);
    } catch (error: any) {
      console.error("Erro ao checar pagamento:", error);
      vscode.postMessage({
        command: "showError",
        data: `Erro ao checar pagamento: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (checkResult) {
      setCheckResult(null);
    } else {
      onBack();
    }
  };

  return (
    <ViewLayout
      title="Checar Pagamento"
      description={
        checkResult
          ? "Status do pagamento retornado pela API"
          : "Informe o ID da cobrança para verificar o status"
      }
      onBack={handleBack}
    >
      <div className="space-y-4">
        {!checkResult ? (
          <>
            <Input
              label="ID do Pagamento"
              placeholder="Ex: bill_..."
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              disabled={isLoading}
            />
            <Button
              className="w-full"
              onClick={handleDoCheckPayment}
              disabled={isLoading}
            >
              {isLoading ? "Consultando..." : "Verificar Status"}
            </Button>
          </>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <JsonViewer data={checkResult} />
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setCheckResult(null)}
            >
              Nova Consulta
            </Button>
          </div>
        )}
      </div>
    </ViewLayout>
  );
}
