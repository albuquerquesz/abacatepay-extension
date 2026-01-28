import { MenuList, type MenuOption, ViewLayout } from "../ui";

interface AuthMainMenuProps {
  onApiKey: () => void;
  onLogout: () => void;
}

export function AuthMainMenu({ onApiKey, onLogout }: AuthMainMenuProps) {
  const options: MenuOption[] = [
    {
      label: "Configurar API Key",
      description: "Adicione ou atualize sua chave de API",
      onClick: onApiKey,
    },
    {
      label: "Sair",
      description: "Encerrar sessão atual",
      onClick: onLogout,
    },
  ];

  return (
    <ViewLayout
      title="Autenticação"
      description="Gerencie suas credenciais e sessão"
    >
      <MenuList options={options} />
    </ViewLayout>
  );
}
