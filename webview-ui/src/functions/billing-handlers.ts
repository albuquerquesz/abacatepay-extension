import { vscode } from "../utils/vscode";

export const handleCreatePixQRCode = () => {
	console.log("Criar Pix QRCode");
};

export const handleCreateCheckout = () => {
	console.log("Criar Checkout");
};

export const handleCheckPayment = (paymentId: string) => {
	console.log("Checar pagamento:", paymentId);
	vscode.postMessage({
		command: "run-terminal",
		payload: {
			command: `abacate billing status ${paymentId}`,
		},
	});
};
