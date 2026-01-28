import { vscode } from "../utils/vscode";

export const commandExecutor = {
  runTerminal(command: string) {
    vscode.postMessage({ command: "run-terminal", payload: { command } });
  },
  showInfo(message: string) {
    vscode.postMessage({ command: "showInfo", data: message });
  },
  showError(message: string) {
    vscode.postMessage({ command: "showError", data: message });
  },
};
