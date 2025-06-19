import { z } from "zod";
import { type McpTool } from "../../types";
import { deployContract, callContract, sendTransaction, verifyContract } from "../../tools/foundry_cli/deploy";

export const DeployContractTool: McpTool = {
    name: "foundry_cli_deploy",
    description: "Deploy a smart contract to a network using Forge",
    schema: {
        contractName: z.string().describe("Name of the contract to deploy"),
        rpcUrl: z.string().describe("RPC URL of the target network"),
        privateKey: z.string().describe("Private key for deployment"),
        constructorArgs: z.array(z.string()).optional().describe("Constructor arguments for the contract"),
        verify: z.boolean().optional().describe("Verify contract on Etherscan"),
        projectPath: z.string().optional().describe("Path to the Foundry project directory")
    },
    handler: async (input: Record<string, any>) => {
        const result = await deployContract(
            input.contractName,
            input.rpcUrl,
            input.privateKey,
            input.constructorArgs,
            input.verify,
            input.projectPath
        );

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: `Contract ${input.contractName} deployed successfully`,
            output: result.stdout
        };
    },
};

export const CallContractTool: McpTool = {
    name: "foundry_cli_call",
    description: "Call a read-only function on a deployed smart contract",
    schema: {
        contractAddress: z.string().describe("Address of the deployed contract"),
        functionSignature: z.string().describe("Function signature (e.g., 'balanceOf(address)')"),
        rpcUrl: z.string().describe("RPC URL of the network"),
        functionArgs: z.array(z.string()).optional().describe("Function arguments")
    },
    handler: async (input: Record<string, any>) => {
        const result = await callContract(
            input.contractAddress,
            input.functionSignature,
            input.rpcUrl,
            input.functionArgs
        );

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Function called successfully",
            output: result.stdout
        };
    },
};

export const SendTransactionTool: McpTool = {
    name: "foundry_cli_send",
    description: "Send a transaction to a smart contract function",
    schema: {
        contractAddress: z.string().describe("Address of the deployed contract"),
        functionSignature: z.string().describe("Function signature (e.g., 'transfer(address,uint256)')"),
        rpcUrl: z.string().describe("RPC URL of the network"),
        privateKey: z.string().describe("Private key for signing the transaction"),
        functionArgs: z.array(z.string()).optional().describe("Function arguments"),
        value: z.string().optional().describe("ETH value to send with transaction"),
        gasLimit: z.string().optional().describe("Gas limit for the transaction")
    },
    handler: async (input: Record<string, any>) => {
        const result = await sendTransaction(
            input.contractAddress,
            input.functionSignature,
            input.rpcUrl,
            input.privateKey,
            input.functionArgs,
            input.value,
            input.gasLimit
        );

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Transaction sent successfully",
            output: result.stdout
        };
    },
};

export const VerifyContractTool: McpTool = {
    name: "foundry_cli_verify",
    description: "Verify a deployed smart contract on Etherscan",
    schema: {
        contractAddress: z.string().describe("Address of the deployed contract"),
        contractName: z.string().describe("Name of the contract to verify"),
        etherscanApiKey: z.string().describe("Etherscan API key"),
        constructorArgs: z.array(z.string()).optional().describe("Constructor arguments used during deployment"),
        projectPath: z.string().optional().describe("Path to the Foundry project directory")
    },
    handler: async (input: Record<string, any>) => {
        const result = await verifyContract(
            input.contractAddress,
            input.contractName,
            input.etherscanApiKey,
            input.constructorArgs,
            input.projectPath
        );

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Contract verified successfully",
            output: result.stdout
        };
    },
};
