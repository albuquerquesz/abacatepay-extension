import { useState } from "react";
import {
	handleCreateCheckout,
	handleCreatePixQRCode,
} from "../../functions/billing-handlers";
import { MenuList, type MenuOption, ViewLayout } from "../ui";

type BillingViewState = "main" | "pix-setup";

export function BillingView() {
	const [view, setView] = useState<BillingViewState>("main");

	const handleManualPix = () => {
		// TODO: Implementar tela de formulário manual no futuro
		console.log("Manual Pix selected");
		handleCreatePixQRCode();
	};

	const handleRandomPix = () => {
		// TODO: Implementar geração aleatória no futuro
		console.log("Random Pix selected");
		handleCreatePixQRCode();
	};

	const mainOptions: MenuOption[] = [
		{
			label: "Criar Pix QRCode",
			description: "Gere um QRCode estático ou dinâmico para Pix",
			onClick: () => setView("pix-setup"),
		},
		{
			label: "Criar Checkout",
			description: "Página de pagamento segura e otimizada",
			onClick: handleCreateCheckout,
		},
	];

	const pixOptions: MenuOption[] = [
		{
			label: "Preenchimento Manual",
			description: "Defina valor, cliente e descrição da cobrança",
			onClick: handleManualPix,
		},
		{
			label: "Gerar com Dados Aleatórios",
			description: "Crie um Pix instantâneo para fins de teste",
			onClick: handleRandomPix,
		},
	];

	if (view === "pix-setup") {
		return (
			<ViewLayout
				title="Criar Pix"
				description="Como deseja gerar a cobrança?"
				onBack={() => setView("main")}
			>
				<MenuList options={pixOptions} />
			</ViewLayout>
		);
	}

	return (
		<ViewLayout
			title="Billing"
			description="Gerencie cobranças e pagamentos de forma simples"
		>
			<MenuList options={mainOptions} />
		</ViewLayout>
	);
}
