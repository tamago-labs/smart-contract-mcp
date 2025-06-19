import { AptosCliTools } from "./aptos_cli"
import { SuiCliTools } from "./sui_cli"
import { FoundryCliTools } from "./foundry_cli"

export const SmartContractMcpTools = {
    // CLI Tools
    ...AptosCliTools,
    ...SuiCliTools,
    ...FoundryCliTools
}