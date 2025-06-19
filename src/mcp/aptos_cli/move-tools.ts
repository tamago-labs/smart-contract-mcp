import { z } from "zod";
import { McpTool } from "../../types";
import {
    initMovePackage,
    compileMovePackage,
    testMovePackage,
    publishMovePackage,
    runMoveFunction,
    cleanMovePackage,
    downloadMoveDependencies,
    proveMovePackage
} from "../../tools/aptos_cli/move"

export const InitMovePackageTool: McpTool = {
    name: "aptos_cli_move_init",
    description: "Initialize a new Aptos Move package",
    schema: {
        packageName: z.string().describe("Name of the package"),
        path: z.string().optional().describe("Directory path where to create the package")
    },
    handler: async (input: Record<string, any>) => {
        const result = await initMovePackage(input.packageName, input.path);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            output: result.stdout,
            parsed: result.parsed
        };
    },
};

export const CompileMovePackageTool: McpTool = {
    name: "aptos_cli_move_compile",
    description: "Compile a Aptos Move package",
    schema: {
        packagePath: z.string().describe("Path to the Move package"),
        dev: z.boolean().optional().describe("Compile in dev mode"),
        test: z.boolean().optional().describe("Compile in test mode"),
        namedAddresses: z.record(z.string()).optional().describe("Named addresses mapping")
    },
    handler: async (input: Record<string, any>) => {
        const result = await compileMovePackage(input.packagePath, {
            dev: input.dev,
            test: input.test,
            namedAddresses: input.namedAddresses
        });

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            output: result.stdout,
            parsed: result.parsed
        };
    },
};

export const TestMovePackageTool: McpTool = {
    name: "aptos_cli_move_test",
    description: "Run tests for a Aptos Move package",
    schema: {
        packagePath: z.string().describe("Path to the Move package"),
        filter: z.string().optional().describe("Test filter pattern"),
        coverage: z.boolean().optional().describe("Generate coverage report"),
        namedAddresses: z.record(z.string()).optional().describe("Named addresses mapping")
    },
    handler: async (input: Record<string, any>) => {
        const result = await testMovePackage(input.packagePath, {
            filter: input.filter,
            coverage: input.coverage,
            namedAddresses: input.namedAddresses
        });

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            output: result.stdout,
            parsed: result.parsed
        };
    },
};

export const PublishMovePackageTool: McpTool = {
    name: "aptos_cli_move_publish",
    description: "Publish a Aptos Move package to the blockchain",
    schema: {
        packagePath: z.string().describe("Path to the Move package"),
        namedAddresses: z.record(z.string()).optional().describe("Named addresses mapping"),
        maxGas: z.number().optional().describe("Maximum gas to spend"),
        profile: z.string().optional().describe("Profile to use for publishing")
    },
    handler: async (input: Record<string, any>) => {
        const result = await publishMovePackage(input.packagePath, {
            namedAddresses: input.namedAddresses,
            maxGas: input.maxGas,
            profile: input.profile
        });

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            output: result.stdout,
            parsed: result.parsed
        };
    },
};

export const RunMoveFunctionTool: McpTool = {
    name: "aptos_cli_move_run",
    description: "Run a Aptos Move function",
    schema: {
        functionId: z.string().describe("Function identifier (address::module::function)"),
        functionArgs: z.array(z.string()).optional().describe("Function arguments"),
        typeArgs: z.array(z.string()).optional().describe("Type arguments"),
        profile: z.string().optional().describe("Profile to use"),
        maxGas: z.number().optional().describe("Maximum gas to spend")
    },
    handler: async (input: Record<string, any>) => {
        const result = await runMoveFunction(input.functionId, input.functionArgs, {
            typeArgs: input.typeArgs,
            profile: input.profile,
            maxGas: input.maxGas
        });

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            output: result.stdout,
            parsed: result.parsed
        };
    },
};

export const CleanMovePackageTool: McpTool = {
    name: "aptos_cli_move_clean",
    description: "Clean Aptos Move package build artifacts",
    schema: {
        packagePath: z.string().describe("Path to the Move package")
    },
    handler: async (input: Record<string, any>) => {
        const result = await cleanMovePackage(input.packagePath);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            output: result.stdout,
            parsed: result.parsed
        };
    },
};

export const DownloadMoveDependenciesTool: McpTool = {
    name: "aptos_cli_move_download",
    description: "Download Aptos Move package dependencies",
    schema: {
        packagePath: z.string().describe("Path to the Move package")
    },
    handler: async (input: Record<string, any>) => {
        const result = await downloadMoveDependencies(input.packagePath);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            output: result.stdout,
            parsed: result.parsed
        };
    },
};

export const ProveMovePackageTool: McpTool = {
    name: "aptos_cli_move_prove",
    description: "Prove Aptos Move package (formal verification)",
    schema: {
        packagePath: z.string().describe("Path to the Move package"),
        namedAddresses: z.record(z.string()).optional().describe("Named addresses mapping")
    },
    handler: async (input: Record<string, any>) => {
        const result = await proveMovePackage(input.packagePath, {
            namedAddresses: input.namedAddresses
        });

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            output: result.stdout,
            parsed: result.parsed
        };
    },
};
