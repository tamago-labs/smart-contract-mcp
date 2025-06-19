import { z } from "zod";
import { type McpTool } from "../../types";
import { 
    convertNumber, 
    generateWallet, 
    getAddressFromPrivateKey, 
    signMessage, 
    getFunctionSelector, 
    encodeCallData, 
    decodeCallData, 
    getStorageValue 
} from "../../tools/foundry_cli/utils";

export const ConvertNumberTool: McpTool = {
    name: "foundry_cli_convert",
    description: "Convert between different number formats (hex, decimal, wei, ether)",
    schema: {
        value: z.string().describe("Value to convert"),
        toFormat: z.enum(['hex', 'dec', 'wei', 'ether', 'gwei']).describe("Target format")
    },
    handler: async (input: Record<string, any>) => {
        try {
            const result = await convertNumber(input.value, input.toFormat);

            if (!result.success) {
                return {
                    status: "error",
                    message: result.stderr
                };
            }

            return {
                status: "success",
                message: `Converted ${input.value} to ${input.toFormat}`,
                convertedValue: result.stdout
            };
        } catch (error: any) {
            return {
                status: "error",
                message: error.message
            };
        }
    },
};

export const GenerateWalletTool: McpTool = {
    name: "foundry_cli_generate_wallet",
    description: "Generate a new Ethereum wallet with private key and address",
    schema: {
        mnemonic: z.boolean().optional().describe("Generate with mnemonic phrase")
    },
    handler: async (input: Record<string, any>) => {
        const result = await generateWallet(input.mnemonic);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "New wallet generated successfully",
            walletInfo: result.stdout
        };
    },
};

export const GetAddressTool: McpTool = {
    name: "foundry_cli_get_address",
    description: "Get Ethereum address from private key",
    schema: {
        privateKey: z.string().describe("Private key (hex format)")
    },
    handler: async (input: Record<string, any>) => {
        const result = await getAddressFromPrivateKey(input.privateKey);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Address retrieved successfully",
            address: result.stdout
        };
    },
};

export const SignMessageTool: McpTool = {
    name: "foundry_cli_sign_message",
    description: "Sign a message with a private key",
    schema: {
        message: z.string().describe("Message to sign"),
        privateKey: z.string().describe("Private key for signing")
    },
    handler: async (input: Record<string, any>) => {
        const result = await signMessage(input.message, input.privateKey);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Message signed successfully",
            signature: result.stdout
        };
    },
};

export const GetFunctionSelectorTool: McpTool = {
    name: "foundry_cli_get_selector",
    description: "Calculate function selector from function signature",
    schema: {
        functionSignature: z.string().describe("Function signature (e.g., 'transfer(address,uint256)')")
    },
    handler: async (input: Record<string, any>) => {
        const result = await getFunctionSelector(input.functionSignature);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Function selector calculated successfully",
            selector: result.stdout
        };
    },
};

export const EncodeCallDataTool: McpTool = {
    name: "foundry_cli_encode_data",
    description: "Encode function call data for transaction",
    schema: {
        functionSignature: z.string().describe("Function signature (e.g., 'transfer(address,uint256)')"),
        functionArgs: z.array(z.string()).optional().describe("Function arguments")
    },
    handler: async (input: Record<string, any>) => {
        const result = await encodeCallData(input.functionSignature, input.functionArgs);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Call data encoded successfully",
            encodedData: result.stdout
        };
    },
};

export const DecodeCallDataTool: McpTool = {
    name: "foundry_cli_decode_data",
    description: "Decode transaction call data",
    schema: {
        functionSignature: z.string().describe("Function signature for decoding"),
        callData: z.string().describe("Encoded call data (hex)")
    },
    handler: async (input: Record<string, any>) => {
        const result = await decodeCallData(input.functionSignature, input.callData);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Call data decoded successfully",
            decodedData: result.stdout
        };
    },
};

export const GetStorageTool: McpTool = {
    name: "foundry_cli_get_storage",
    description: "Get storage slot value from a contract",
    schema: {
        contractAddress: z.string().describe("Contract address"),
        storageSlot: z.string().describe("Storage slot (hex or decimal)"),
        rpcUrl: z.string().describe("RPC URL of the network"),
        block: z.string().optional().describe("Block number or tag (latest, earliest, pending)")
    },
    handler: async (input: Record<string, any>) => {
        const result = await getStorageValue(
            input.contractAddress,
            input.storageSlot,
            input.rpcUrl,
            input.block
        );

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Storage value retrieved successfully",
            storageValue: result.stdout
        };
    },
};
