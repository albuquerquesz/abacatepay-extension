import { useState } from "react";
import { vscode } from "./utils/vscode";

function App() {
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        if (!message.trim()) return;

        vscode.postMessage({
            command: "showInfo",
            data: `Mensagem recebida: ${message}`,
        });
        setMessage("");
    };

    return (
        <main className="p-4 flex flex-col gap-6 min-h-screen">
            <header className="flex flex-col items-center gap-2">
                <div className="text-5xl">🥑</div>
                <h1 className="text-2xl font-bold">AbacatePay</h1>
                <p className="opacity-70 text-sm">Integração VS Code</p>
            </header>

            <section className="flex flex-col gap-4">
                <div className="bg-vscode-card-bg border border-vscode-border p-4 rounded-md shadow-sm">
                    <h2 className="text-lg font-semibold mb-2 text-vscode-fg">Teste de Comunicação</h2>
                    <p className="text-sm mb-4 opacity-80">Digite uma mensagem para testar a comunicação entre React e a extensão:</p>

                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            placeholder="Digite sua mensagem..."
                            className="bg-vscode-input-bg text-vscode-input-fg border border-vscode-input-border p-2 rounded outline-none focus:ring-1 focus:ring-vscode-button-bg text-sm"
                        />
                        <button 
                            onClick={handleSubmit} 
                            className="bg-vscode-button-bg hover:bg-vscode-button-hover text-vscode-button-fg py-2 px-4 rounded transition-colors cursor-pointer text-sm font-medium"
                        >
                            Enviar
                        </button>
                    </div>
                </div>

                <div className="bg-vscode-card-bg border border-vscode-border p-4 rounded-md shadow-sm">
                    <h2 className="text-lg font-semibold mb-3 text-vscode-fg">Status</h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                            <span>Extensão conectada</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm opacity-60">
                            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
                            <span>API não configurada</span>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="mt-auto pt-4 border-t border-vscode-border text-center text-xs opacity-50">
                <p>AbacatePay v0.0.1</p>
            </footer>
        </main>
    );
}

export default App;
