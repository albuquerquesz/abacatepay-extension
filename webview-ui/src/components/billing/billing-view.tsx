import {
	handleCreateCheckout,
	handleCreatePixQRCode,
} from "../../functions/billing-handlers";
import { MenuList, type MenuOption, ViewLayout } from "../ui";

export function BillingView() {
	const options: MenuOption[] = [
		{
			label: "Criar Pix QRCode",
			description: "Gere um QRCode estático ou dinâmico para Pix",
			onClick: handleCreatePixQRCode,
		},
		{
			label: "Criar Checkout",
			description: "Página de pagamento segura e otimizada",
			onClick: handleCreateCheckout,
		},
	];

	return (
		<ViewLayout
			title="Billing"
			description="Gerencie cobranças e pagamentos de forma simples"
		>
			<MenuList options={options} />
		</ViewLayout>
	);
}