import { z } from "zod";
import { type McpTool } from "../../types";
import { getBalance, getTransaction, getTransactionReceipt, getBlock, getGasPrice, estimateGas, getChainId } from "../../tools/foundry_cli/network";

export const GetBalanceTool: McpTool = {
    name: "foundry_cli_get_balance",
    description: "Get ETH balance of an account",
    schema: {
        address: z.string().describe("Account address to check balance"),
        rpcUrl: z.string().describe("RPC URL of the network"),
        block: z.string().optional().describe("Block number or tag (latest, earliest, pending)")
    },
    handler: async (input: Record<string, any>) => {
        const result = await getBalance(input.address, input.rpcUrl, input.block);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Balance retrieved successfully",
            balance: result.stdout
        };
    },
};

export const GetTransactionTool: McpTool = {
    name: "foundry_cli_get_transaction",
    description: "Get transaction details by hash",
    schema: {
        txHash: z.string().describe("Transaction hash"),
        rpcUrl: z.string().describe("RPC URL of the network")
    },
    handler: async (input: Record<string, any>) => {
        const result = await getTransaction(input.txHash, input.rpcUrl);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Transaction retrieved successfully",
            transaction: result.stdout
        };
    },
};

export const GetTransactionReceiptTool: McpTool = {
    name: "foundry_cli_get_receipt",
    description: "Get transaction receipt by hash",
    schema: {
        txHash: z.string().describe("Transaction hash"),
        rpcUrl: z.string().describe("RPC URL of the network")
    },
    handler: async (input: Record<string, any>) => {
        const result = await getTransactionReceipt(input.txHash, input.rpcUrl);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Receipt retrieved successfully",
            receipt: result.stdout
        };
    },
};

export const GetBlockTool: McpTool = {
    name: "foundry_cli_get_block",
    description: "Get block information by number or hash",
    schema: {
        blockId: z.string().describe("Block number, hash, or tag (latest, earliest, pending)"),
        rpcUrl: z.string().describe("RPC URL of the network")
    },
    handler: async (input: Record<string, any>) => {
        const result = await getBlock(input.blockId, input.rpcUrl);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Block retrieved successfully",
            block: result.stdout
        };
    },
};

export const GetGasPriceTool: McpTool = {
    name: "foundry_cli_get_gas_price",
    description: "Get current gas price from the network",
    schema: {
        rpcUrl: z.string().describe("RPC URL of the network")
    },
    handler: async (input: Record<string, any>) => {
        const result = await getGasPrice(input.rpcUrl);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Gas price retrieved successfully",
            gasPrice: result.stdout
        };
    },
};

export const EstimateGasTool: McpTool = {
    name: "foundry_cli_estimate_gas",
    description: "Estimate gas required for a transaction",
    schema: {
        toAddress: z.string().describe("Destination address"),
        rpcUrl: z.string().describe("RPC URL of the network"),
        functionSignature: z.string().optional().describe("Function signature for contract calls"),
        functionArgs: z.array(z.string()).optional().describe("Function arguments"),
        value: z.string().optional().describe("ETH value to send"),
        fromAddress: z.string().optional().describe("Sender address")
    },
    handler: async (input: Record<string, any>) => {
        const result = await estimateGas(
            input.toAddress,
            input.rpcUrl,
            input.functionSignature,
            input.functionArgs,
            input.value,
            input.fromAddress
        );

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Gas estimation completed successfully",
            gasEstimate: result.stdout
        };
    },
};

export const GetChainIdTool: McpTool = {
    name: "foundry_cli_get_chain_id",
    description: "Get the chain ID of the network",
    schema: {
        rpcUrl: z.string().describe("RPC URL of the network")
    },
    handler: async (input: Record<string, any>) => {
        const result = await getChainId(input.rpcUrl);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Chain ID retrieved successfully",
            chainId: result.stdout
        };
    },
};
