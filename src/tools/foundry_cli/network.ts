import { executeFoundryCommand } from './executor';

/**
 * Get ETH balance of an account
 */
export const getBalance = async (address: string, rpcUrl: string, block?: string) => {
  const args = ['balance', address, '--rpc-url', rpcUrl];
  if (block) args.push('--block', block);
  
  return executeFoundryCommand('cast', args);
};

/**
 * Get transaction details by hash
 */
export const getTransaction = async (txHash: string, rpcUrl: string) => {
  const args = ['tx', txHash, '--rpc-url', rpcUrl];
  return executeFoundryCommand('cast', args);
};

/**
 * Get transaction receipt
 */
export const getTransactionReceipt = async (txHash: string, rpcUrl: string) => {
  const args = ['receipt', txHash, '--rpc-url', rpcUrl];
  return executeFoundryCommand('cast', args);
};

/**
 * Get block information
 */
export const getBlock = async (blockId: string, rpcUrl: string) => {
  const args = ['block', blockId, '--rpc-url', rpcUrl];
  return executeFoundryCommand('cast', args);
};

/**
 * Get current gas price
 */
export const getGasPrice = async (rpcUrl: string) => {
  const args = ['gas-price', '--rpc-url', rpcUrl];
  return executeFoundryCommand('cast', args);
};

/**
 * Estimate gas for a transaction
 */
export const estimateGas = async (
  toAddress: string,
  rpcUrl: string,
  functionSignature?: string,
  functionArgs?: string[],
  value?: string,
  fromAddress?: string
) => {
  const args = ['estimate', toAddress];
  
  if (functionSignature) {
    args.push(`"${functionSignature}"`);
    if (functionArgs && functionArgs.length > 0) {
      args.push(...functionArgs);
    }
  }
  
  if (value) args.push('--value', value);
  if (fromAddress) args.push('--from', fromAddress);
  
  args.push('--rpc-url', rpcUrl);
  
  return executeFoundryCommand('cast', args);
};

/**
 * Get chain ID
 */
export const getChainId = async (rpcUrl: string) => {
  const args = ['chain-id', '--rpc-url', rpcUrl];
  return executeFoundryCommand('cast', args);
};
