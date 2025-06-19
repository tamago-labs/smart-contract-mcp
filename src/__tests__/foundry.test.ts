import { checkFoundryInstallation } from '../tools/foundry_cli/executor';
import { FoundryCliTools } from '../mcp/foundry_cli';

describe('Foundry CLI Tools', () => {
    test('should check foundry installation', async () => {
        const isInstalled = await checkFoundryInstallation();
        console.log('Foundry installed:', isInstalled);
        
        if (isInstalled) {
            // Can add version check if needed
            console.log('Foundry is available for testing');
        }
    });

    test('should have all required tools', () => {
        const expectedTools = [
            'InitProjectTool',
            'BuildProjectTool',
            'TestProjectTool',
            'DeployContractTool',
            'CallContractTool',
            'GetBalanceTool',
            'ConvertNumberTool'
        ];

        expectedTools.forEach(toolName => {
            expect(FoundryCliTools[toolName]).toBeDefined();
            expect(FoundryCliTools[toolName].name).toBeDefined();
            expect(FoundryCliTools[toolName].description).toBeDefined();
            expect(FoundryCliTools[toolName].schema).toBeDefined();
            expect(FoundryCliTools[toolName].handler).toBeDefined();
        });
    });

    test('should validate tool schemas', () => {
        Object.values(FoundryCliTools).forEach(tool => {
            expect(tool.schema).toBeDefined();
            expect(typeof tool.handler).toBe('function');
        });
    });

    test('should have correct tool names', () => {
        const toolNames = Object.values(FoundryCliTools).map(tool => tool.name);
        
        // Check that all tool names start with foundry_cli_
        toolNames.forEach(name => {
            expect(name).toMatch(/^foundry_cli_/);
        });
    });
});
