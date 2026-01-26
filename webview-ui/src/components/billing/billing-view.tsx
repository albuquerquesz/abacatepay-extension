export function BillingView() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-vscode-bg text-vscode-fg p-6">
			<div className="text-center mb-8">
				<span className="text-5xl mb-4 block">💳</span>
				<h1 className="text-2xl font-bold text-abacate-primary mb-2">
					Billing
				</h1>
				<p className="text-sm text-vscode-fg/70">
					Gerencie cobranças e pagamentos
				</p>
			</div>

			<div className="bg-vscode-card-bg rounded-lg p-6 max-w-md w-full shadow-lg">
				<p className="mb-4 text-sm leading-relaxed">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris.
				</p>
				<p className="mb-4 text-sm leading-relaxed">
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
					dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est
					laborum.
				</p>
				<p className="text-sm leading-relaxed">
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem
					accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
					ab illo inventore veritatis.
				</p>
			</div>
		</div>
	);
}
