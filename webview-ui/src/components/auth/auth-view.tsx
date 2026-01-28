import { useState } from "react";
import { vscode } from "../../utils/vscode";
import { Button, Input, ViewLayout } from "../ui";
import { AuthMainMenu } from "./auth-main-menu";

type AuthViewState = "main" | "profile-form";
type ProfileFormMode = "login" | "switch";

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

  const handleProfileSubmit = () => {
    if (!profileName.trim()) {
      vscode.postMessage({
        command: "showError",
        data: "O nome do perfil é obrigatório",
      });
      return;
    }

    const command =
      formMode === "login"
        ? `abacate login --name ${profileName}`
        : `abacate switch ${profileName}`;

    vscode.postMessage({
      command: "run-terminal",
      payload: {
        command,
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
    const isSwitch = formMode === "switch";
    return (
      <ViewLayout
        title={isSwitch ? "Mudar de Perfil" : "Configurar Perfil"}
        description={
          isSwitch
            ? "Informe o nome do perfil para o qual deseja alternar"
            : "Informe o nome do perfil para autenticar"
        }
        onBack={() => setView("main")}
      >
        <div className="space-y-4">
          <Input
            label="Nome do Perfil"
            placeholder="Ex: default"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
          <Button className="w-full" onClick={handleProfileSubmit}>
            {isSwitch ? "Alternar Perfil" : "Login no Terminal"}
          </Button>
        </div>
      </ViewLayout>
    );
  }

  return (
    <AuthMainMenu
      onAddProfile={handleGoToProfileForm}
      onSwitchProfile={handleGoToSwitchProfile}
      onListProfile={handleListProfile}
      onLogout={handleLogout}
    />
  );
}
