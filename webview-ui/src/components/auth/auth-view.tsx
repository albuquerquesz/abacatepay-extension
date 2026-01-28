import { useState } from "react";
import { vscode } from "../../utils/vscode";
import { Button, Input, ViewLayout } from "../ui";
import { AuthMainMenu } from "./auth-main-menu";

type AuthViewState = "main" | "profile-form";

export function AuthView() {
  const [view, setView] = useState<AuthViewState>("main");
  const [profileName, setProfileName] = useState("");

  const handleGoToProfileForm = () => {
    setProfileName("");
    setView("profile-form");
  };

  const handleLoginProfile = () => {
    if (!profileName.trim()) {
      vscode.postMessage({
        command: "showError",
        data: "O nome do perfil é obrigatório",
      });
      return;
    }

    vscode.postMessage({
      command: "run-terminal",
      payload: {
        command: `abacate login --name ${profileName}`,
      },
    });
    setView("main");
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

  if (view === "profile-form") {
    return (
      <ViewLayout
        title="Configurar Perfil"
        description="Informe o nome do perfil para autenticar"
        onBack={() => setView("main")}
      >
        <div className="space-y-4">
          <Input
            label="Nome do Perfil"
            placeholder="Ex: default"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
          <Button className="w-full" onClick={handleLoginProfile}>
            Login no Terminal
          </Button>
        </div>
      </ViewLayout>
    );
  }

  return (
    <AuthMainMenu
      onAddProfile={handleGoToProfileForm}
      onListProfile={handleListProfile}
      onLogout={handleLogout}
    />
  );
}
