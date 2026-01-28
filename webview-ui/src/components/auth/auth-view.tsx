import { useState } from "react";
import { vscode } from "../../utils/vscode";
import { AuthMainMenu } from "./auth-main-menu";

type AuthViewState = "main" | "api-key";

export function AuthView() {
  const [view, setView] = useState<AuthViewState>("main");

  const handleApiKey = () => {
    setView("api-key");
  };

  const handleListProfile = () => {
    vscode.postMessage({
      command: "run-terminal",
      payload: {
        command: "abacate profile list",
      },
    });
  };

  const handleLogout = () => {
    vscode.postMessage({
      command: "logout",
    });
  };

  if (view === "api-key") {
    return null;
  }

  return (
    <AuthMainMenu
      onApiKey={handleApiKey}
      onListProfile={handleListProfile}
      onLogout={handleLogout}
    />
  );
}
