import { AptosCliTools } from "./aptos_cli"
import { SuiCliTools } from "./sui_cli"

export const SmartContractMcpTools = {
    // CLI Tools
    ...AptosCliTools,
    ...SuiCliTools
}