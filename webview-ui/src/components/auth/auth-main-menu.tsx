import { MenuList, type MenuOption, ViewLayout } from "../ui";

interface AuthMainMenuProps {
  onAddProfile: () => void;
  onListProfile: () => void;
  onLogout: () => void;
}

export function AuthMainMenu({
  onAddProfile,
  onListProfile,
  onLogout,
}: AuthMainMenuProps) {
  const options: MenuOption[] = [
    {
      label: "Adicionar/Atualizar Perfil",
      description: "Configure um perfil novo ou existente",
      onClick: onAddProfile,
    },
    {
      label: "Listar Perfis",
      description: "Veja as informações dos seus perfis no terminal",
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
