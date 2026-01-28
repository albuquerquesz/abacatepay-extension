import { MenuList, type MenuOption, ViewLayout } from "../ui";

interface AuthMainMenuProps {
  onApiKey: () => void;
  onListProfile: () => void;
  onLogout: () => void;
}

export function AuthMainMenu({ onApiKey, onListProfile, onLogout }: AuthMainMenuProps) {
  const options: MenuOption[] = [
    {
      label: "Configurar API Key",
      description: "Adicione ou atualize sua chave de API",
      onClick: onApiKey,
    },
    {
      label: "Listar Perfil",
      description: "Veja as informações do seu perfil no terminal",
      onClick: onListProfile,
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
