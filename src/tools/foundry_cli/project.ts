import { executeFoundryCommand } from './executor';

/**
 * Initialize a new Foundry project
 */
export const initProject = async (projectName: string, template?: string, directory?: string) => {
  const args = ['init'];
  
  const projectPath = directory ? `${directory}/${projectName}` : projectName;
  args.push(projectPath);
  
  if (template && template !== 'default') {
    args.push('--template', template);
  }
  
  return executeFoundryCommand('forge', args);
};

/**
 * Build/compile smart contracts
 */
export const buildProject = async (projectPath?: string, optimize?: boolean, viaIr?: boolean) => {
  const args = ['build'];
  
  if (optimize) args.push('--optimize');
  if (viaIr) args.push('--via-ir');
  
  const options = projectPath ? { cwd: projectPath } : {};
  
  return executeFoundryCommand('forge', args);
};

/**
 * Run smart contract tests
 */
export const runTests = async (
  projectPath?: string, 
  testName?: string, 
  verbosity?: string, 
  gasReport?: boolean
) => {
  const args = ['test'];
  
  if (testName) args.push('--match-test', testName);
  if (verbosity) args.push(`-${verbosity.charAt(0)}`);
  if (gasReport) args.push('--gas-report');
  
  return executeFoundryCommand('forge', args);
};

/**
 * Clean build artifacts
 */
export const cleanProject = async (projectPath?: string) => {
  return executeFoundryCommand('forge', ['clean']);
};

/**
 * Format Solidity code
 */
export const formatCode = async (projectPath?: string, check?: boolean) => {
  const args = ['fmt'];
  if (check) args.push('--check');
  
  return executeFoundryCommand('forge', args);
};
