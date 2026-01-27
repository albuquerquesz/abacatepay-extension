import { useState } from "react";
import { handleCreateCheckout } from "../../functions/billing-handlers";
import { api } from "../../services/bridge-api";
import { vscode } from "../../utils/vscode";
import { Button, Input, MenuList, type MenuOption, ViewLayout } from "../ui";

type BillingViewState = "main" | "pix-setup" | "pix-manual";

export function BillingView() {
	const [view, setView] = useState<BillingViewState>("main");
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		amount: "",
		description: "",
		customerName: "",
		customerEmail: "",
		customerTaxId: "",
	});

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleManualPix = () => {
		setView("pix-manual");
	};

	const handleRandomPix = () => {
		console.log("Random Pix selected");
		vscode.postMessage({
			command: "run-terminal",
			payload: {
				command: "abacate create pix",
			},
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const result = await api.post("/pixQrCode/create", {
				amount: Number(formData.amount),
				description: formData.description,
				expiresIn: 3600, // 1 hora por padrão
				customer: {
					name: formData.customerName,
					email: formData.customerEmail,
					taxId: formData.customerTaxId,
				},
				metadata: {
					externalId: `ext_${Date.now()}`,
				},
			});

			console.log("Pix gerado com sucesso:", result);
			vscode.postMessage({
				command: "showInfo",
				data: "Cobrança Pix gerada com sucesso!",
			});
			setView("main");
		} catch (error: any) {
			console.error("Erro ao gerar Pix:", error);
			vscode.postMessage({
				command: "showError",
				data: `Erro ao gerar Pix: ${error.message}`,
			});
		} finally {
			setIsLoading(false);
		}
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

	if (view === "pix-manual") {
		return (
			<ViewLayout
				title="Novo Pix"
				description="Preencha os dados da cobrança"
				onBack={() => setView("pix-setup")}
			>
				<form className="space-y-4 pb-8" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<label className="text-xs font-medium text-vscode-fg/70">
							Valor (em centavos)
						</label>
						<Input
							type="number"
							placeholder="Ex: 1000 (para R$ 10,00)"
							value={formData.amount}
							onChange={(e) => handleInputChange("amount", e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<label className="text-xs font-medium text-vscode-fg/70">
							Descrição do Produto
						</label>
						<Input
							placeholder="Ex: Camiseta Algodão"
							value={formData.description}
							onChange={(e) => handleInputChange("description", e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<label className="text-xs font-medium text-vscode-fg/70">
							Nome do Cliente
						</label>
						<Input
							placeholder="Ex: João da Silva"
							value={formData.customerName}
							onChange={(e) => handleInputChange("customerName", e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<label className="text-xs font-medium text-vscode-fg/70">
							E-mail do Cliente
						</label>
						<Input
							type="email"
							placeholder="joao@email.com"
							value={formData.customerEmail}
							onChange={(e) =>
								handleInputChange("customerEmail", e.target.value)
							}
							required
						/>
					</div>
					<div className="space-y-2">
						<label className="text-xs font-medium text-vscode-fg/70">
							Tax ID (CPF ou CNPJ)
						</label>
						<Input
							placeholder="000.000.000-00"
							value={formData.customerTaxId}
							onChange={(e) =>
								handleInputChange("customerTaxId", e.target.value)
							}
							required
						/>
					</div>
					<Button type="submit" className="w-full mt-4" disabled={isLoading}>
						{isLoading ? "Gerando..." : "Gerar Cobrança Pix"}
					</Button>
				</form>
			</ViewLayout>
		);
	}

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