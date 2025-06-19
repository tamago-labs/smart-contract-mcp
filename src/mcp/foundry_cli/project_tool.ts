import { z } from "zod";
import { type McpTool } from "../../types";
import { initProject, buildProject, runTests, cleanProject, formatCode } from "../../tools/foundry_cli/project";

export const InitProjectTool: McpTool = {
    name: "foundry_cli_init",
    description: "Initialize a new Foundry project with smart contract templates",
    schema: {
        projectName: z.string().describe("Name of the new Foundry project"),
        template: z.string().optional().describe("Template to use (default, erc20, erc721, etc.)"),
        directory: z.string().optional().describe("Directory to create project in")
    },
    handler: async (input: Record<string, any>) => {
        const result = await initProject(input.projectName, input.template, input.directory);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: `Successfully created Foundry project '${input.projectName}'`,
            output: result.stdout
        };
    },
};

export const BuildProjectTool: McpTool = {
    name: "foundry_cli_build",
    description: "Compile smart contracts using Forge",
    schema: {
        projectPath: z.string().optional().describe("Path to the Foundry project directory"),
        optimize: z.boolean().optional().describe("Enable optimization"),
        viaIr: z.boolean().optional().describe("Use intermediate representation for compilation")
    },
    handler: async (input: Record<string, any>) => {
        const result = await buildProject(input.projectPath, input.optimize, input.viaIr);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Smart contracts compiled successfully",
            output: result.stdout
        };
    },
};

export const TestProjectTool: McpTool = {
    name: "foundry_cli_test",
    description: "Run smart contract tests using Forge",
    schema: {
        projectPath: z.string().optional().describe("Path to the Foundry project directory"),
        testName: z.string().optional().describe("Specific test function or contract to run"),
        verbosity: z.string().optional().describe("Verbosity level (error, warn, info, debug, trace)"),
        gasReport: z.boolean().optional().describe("Generate gas usage report")
    },
    handler: async (input: Record<string, any>) => {
        const result = await runTests(input.projectPath, input.testName, input.verbosity, input.gasReport);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Tests completed successfully",
            output: result.stdout
        };
    },
};

export const CleanProjectTool: McpTool = {
    name: "foundry_cli_clean",
    description: "Clean build artifacts and cache",
    schema: {
        projectPath: z.string().optional().describe("Path to the Foundry project directory")
    },
    handler: async (input: Record<string, any>) => {
        const result = await cleanProject(input.projectPath);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: "Build artifacts cleaned successfully",
            output: result.stdout
        };
    },
};

export const FormatCodeTool: McpTool = {
    name: "foundry_cli_format",
    description: "Format Solidity code using forge fmt",
    schema: {
        projectPath: z.string().optional().describe("Path to the Foundry project directory"),
        check: z.boolean().optional().describe("Check if files are formatted without making changes")
    },
    handler: async (input: Record<string, any>) => {
        const result = await formatCode(input.projectPath, input.check);

        if (!result.success) {
            return {
                status: "error",
                message: result.stderr
            };
        }

        return {
            status: "success",
            message: input.check ? "Code formatting is correct" : "Code formatted successfully",
            output: result.stdout
        };
    },
};
