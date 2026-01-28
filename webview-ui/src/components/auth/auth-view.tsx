import { useState } from "react";
import { vscode } from "../../utils/vscode";
import { Button, Input, ViewLayout } from "../ui";
import { AuthMainMenu } from "./auth-main-menu";

type AuthViewState = "main" | "profile-form";
type ProfileFormMode = "login" | "switch" | "delete";

export function AuthView() {
  const [view, setView] = useState<AuthViewState>("main");
  const [formMode, setFormMode] = useState<ProfileFormMode>("login");
  const [profileName, setProfileName] = useState("");

  const handleGoToProfileForm = () => {
    setProfileName("");
    setFormMode("login");
    setView("profile-form");
  };

  const handleGoToSwitchProfile = () => {
    setProfileName("");
    setFormMode("switch");
    setView("profile-form");
  };

  const handleGoToDeleteProfile = () => {
    setProfileName("");
    setFormMode("delete");
    setView("profile-form");
  };

  const handleProfileSubmit = () => {
    if (!profileName.trim()) {
      vscode.postMessage({
        command: "showError",
        data: "O nome do perfil é obrigatório",
      });
      return;
    }

    const handlers: Record<ProfileFormMode, string> = {
      login: `abacate login --name ${profileName}`,
      switch: `abacate switch ${profileName}`,
      delete: `abacate profile delete ${profileName}`,
    };

    vscode.postMessage({
      command: "run-terminal",
      payload: {
        command: handlers[formMode],
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
    const modeConfigs = {
      login: {
        title: "Configurar Perfil",
        description: "Informe o nome do perfil para autenticar",
        button: "Login no Terminal",
      },
      switch: {
        title: "Mudar de Perfil",
        description: "Informe o nome do perfil para o qual deseja alternar",
        button: "Alternar Perfil",
      },
      delete: {
        title: "Deletar Perfil",
        description: "Informe o nome do perfil que deseja remover",
        button: "Deletar Perfil",
      },
    };

    const config = modeConfigs[formMode];

    return (
      <ViewLayout
        title={config.title}
        description={config.description}
        onBack={() => setView("main")}
      >
        <div className="space-y-4">
          <Input
            label="Nome do Perfil"
            placeholder="Ex: default"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
          <Button
            className="w-full"
            variant={formMode === "delete" ? "secondary" : "primary"}
            onClick={handleProfileSubmit}
          >
            {config.button}
          </Button>
        </div>
      </ViewLayout>
    );
  }

  return (
    <AuthMainMenu
      onAddProfile={handleGoToProfileForm}
      onSwitchProfile={handleGoToSwitchProfile}
      onDeleteProfile={handleGoToDeleteProfile}
      onListProfile={handleListProfile}
      onLogout={handleLogout}
    />
  );
}
