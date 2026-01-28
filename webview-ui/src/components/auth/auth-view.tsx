import { useState } from "react";
import { AuthMainMenu } from "./auth-main-menu";

type AuthViewState = "main" | "api-key";

export function AuthView() {
  const [view, setView] = useState<AuthViewState>("main");

  const handleApiKey = () => {
    setView("api-key");
  };

  const handleLogout = () => {
    // TODO: implementar logout
    console.log("Logout");
  };

  if (view === "api-key") {
    // TODO: implementar tela de API key
    return null;
  }

  return (
    <AuthMainMenu
      onApiKey={handleApiKey}
      onLogout={handleLogout}
    />
  );
}
