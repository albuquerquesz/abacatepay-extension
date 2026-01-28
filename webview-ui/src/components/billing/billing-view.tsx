import { useState } from "react";
import { vscode } from "../../utils/vscode";
import { BillingCheckPayment } from "./billing-check-payment";
import { BillingForm } from "./billing-form";
import { BillingMainMenu } from "./billing-main-menu";
import { BillingSetupMenu } from "./billing-setup-menu";

type BillingViewState =
  | "main"
  | "pix-setup"
  | "pix-manual"
  | "checkout-setup"
  | "checkout-manual"
  | "check-payment"
  | "simulate-payment";

export function BillingView() {
  const [view, setView] = useState<BillingViewState>("main");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [checkResult, setCheckResult] = useState<any>(null);
  const [simulateResult, setSimulateResult] = useState<any>(null);
  const [formData, setFormData] = useState({

  const handleRandomPix = () => {
    console.log("Random Pix selected");
    vscode.postMessage({
      command: "run-terminal",
      payload: {
        command: "abacate create pix",
      },
    });
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

  if (view === "check-payment") {
    return <BillingCheckPayment onBack={() => setView("main")} />;
  }

  if (view === "pix-manual") {
    return (
      <BillingForm
        type="pix"
        onBack={() => setView("pix-setup")}
        onSuccess={() => setView("main")}
      />
    );
  }

  if (view === "checkout-manual") {
    return (
      <BillingForm
        type="checkout"
        onBack={() => setView("checkout-setup")}
        onSuccess={() => setView("main")}
      />
    );
  }

  if (view === "pix-setup") {
    return (
      <BillingSetupMenu
        type="pix"
        onManual={() => setView("pix-manual")}
        onRandom={handleRandomPix}
        onBack={() => setView("main")}
      />
    );
  }

  if (view === "checkout-setup") {
    return (
      <BillingSetupMenu
        type="checkout"
        onManual={() => setView("checkout-manual")}
        onRandom={handleRandomCheckout}
        onBack={() => setView("main")}
      />
    );
  }

  return (
    <BillingMainMenu
      onPixSetup={() => setView("pix-setup")}
      onCheckoutSetup={() => setView("checkout-setup")}
      onCheckPayment={() => setView("check-payment")}
    />
  );
}
