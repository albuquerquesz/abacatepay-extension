import { useState } from "react";
import { vscode } from "../../utils/vscode";
import { BillingCheckPayment } from "./billing-check-payment";
import { BillingSimulatePayment } from "./billing-simulate-payment";
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

  if (view === "simulate-payment") {
    return <BillingSimulatePayment onBack={() => setView("main")} />;
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
      onSimulatePayment={() => setView("simulate-payment")}
    />
  );
}
