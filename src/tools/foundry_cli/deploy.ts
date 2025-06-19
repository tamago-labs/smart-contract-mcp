import { executeFoundryCommand } from './executor';

/**
 * Deploy a smart contract
 */
export const deployContract = async (
  contractName: string,
  rpcUrl: string,
  privateKey: string,
  constructorArgs?: string[],
  verify?: boolean,
  projectPath?: string
) => {
  const args = ['create', contractName, '--rpc-url', rpcUrl, '--private-key', privateKey];
  
  if (constructorArgs && constructorArgs.length > 0) {
    args.push('--constructor-args', ...constructorArgs);
  }
  
  if (verify) args.push('--verify');
  
  return executeFoundryCommand('forge', args);
};

/**
 * Call a read-only contract function
 */
export const callContract = async (
  contractAddress: string,
  functionSignature: string,
  rpcUrl: string,
  functionArgs?: string[]
) => {
  const args = ['call', contractAddress, `"${functionSignature}"`];
  
  if (functionArgs && functionArgs.length > 0) {
    args.push(...functionArgs);
  }
  
  args.push('--rpc-url', rpcUrl);
  
  return executeFoundryCommand('cast', args);
};

/**
 * Send a transaction to a contract
 */
export const sendTransaction = async (
  contractAddress: string,
  functionSignature: string,
  rpcUrl: string,
  privateKey: string,
  functionArgs?: string[],
  value?: string,
  gasLimit?: string
) => {
  const args = ['send', contractAddress, `"${functionSignature}"`];
  
  if (functionArgs && functionArgs.length > 0) {
    args.push(...functionArgs);
  }
  
  args.push('--rpc-url', rpcUrl, '--private-key', privateKey);
  
  if (value) args.push('--value', value);
  if (gasLimit) args.push('--gas-limit', gasLimit);
  
  return executeFoundryCommand('cast', args);
};

/**
 * Verify a deployed contract
 */
export const verifyContract = async (
  contractAddress: string,
  contractName: string,
  etherscanApiKey: string,
  constructorArgs?: string[],
  projectPath?: string
) => {
  const args = ['verify-contract', contractAddress, contractName, '--etherscan-api-key', etherscanApiKey];
  
  if (constructorArgs && constructorArgs.length > 0) {
    args.push('--constructor-args', ...constructorArgs);
  }
  
  return executeFoundryCommand('forge', args);
};
