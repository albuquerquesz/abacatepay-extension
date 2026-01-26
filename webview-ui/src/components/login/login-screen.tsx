import logoAbacate from "../../assets/logo-abkt.jpeg";
import { vscode } from "../../utils/vscode";
import { Button } from "../ui/button";

interface LoginScreenProps {
	onLogin?: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
	const handleLogin = () => {
		if (onLogin) {
			onLogin();
		} else {
			vscode.postMessage({ command: "login-google" });
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen w-full bg-vscode-bg text-vscode-fg p-6 animate-fade-in">
			<div className="flex flex-col items-center gap-10 max-w-sm w-full">
				<div className="flex flex-col items-center gap-0">
					<div className="w-48 h-48 flex items-center justify-center select-none overflow-hidden">
						<img
							src={logoAbacate}
							alt="AbacatePay Logo"
							className="w-full h-full object-contain brightness-100 contrast-100 drop-shadow-lg"
						/>
					</div>
					<div className="text-center mt-4">
						<h1 className="text-4xl font-bold bg-gradient-to-r from-abacate-light via-abacate-primary to-abacate-secondary bg-clip-text text-transparent">
							AbacatePay
						</h1>
						<p className="opacity-70 text-sm mt-3 font-medium tracking-wide">
							Your payments, simplified inside your IDE.
						</p>
					</div>
				</div>

				<div className="w-full flex flex-col gap-4">
					<Button
						variant="ghost"
						className="w-full gap-3 py-3 relative overflow-hidden transition-all border border-vscode-fg/20 hover:border-abacate-primary/50 hover:bg-vscode-fg/5 text-vscode-fg font-semibold"
						onClick={handleLogin}
					>
						<svg
							className="w-5 h-5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
						</svg>
						Sign in with Google
					</Button>
					<p className="text-xs text-center opacity-60">
						By clicking continue, you agree to our Terms of Service.
					</p>
				</div>
			</div>
		</div>
	);
}
