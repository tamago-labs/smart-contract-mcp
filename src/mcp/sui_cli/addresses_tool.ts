import { z } from "zod";
import { type McpTool } from "../../types";
import { getAddresses, getActiveAddress, switchAddress } from "../../tools/sui_cli/addresses"

export const ListAddressesTool: McpTool = {
    name: "sui_cli_addresses",
    description: "List all wallet addresses, their aliases, and mark the active address on Sui",
    schema: {},
    handler: async (input: Record<string, any>) => {
        const result = await getAddresses();

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            addresses: result.stdout
        };
    },
};

export const GetActiveAddressTool: McpTool = {
    name: "sui_cli_active_address",
    description: "Get the currently active wallet address on Sui",
    schema: {},
    handler: async (input: Record<string, any>) => {
        const result = await getActiveAddress();

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            activeAddress: result.stdout.trim()
        };
    },
};

export const SwitchAddressTool: McpTool = {
    name: "sui_cli_switch_address",
    description: "Change the active address",
    schema: {
        address: z.string().describe("The address or alias to make active on Sui CLI")
    },
    handler: async (input: Record<string, any>) => {
        const result = await switchAddress(input.address);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: result.stdout
        };
    },
};
