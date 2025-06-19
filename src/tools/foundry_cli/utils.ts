import { executeFoundryCommand } from './executor';

/**
 * Convert between different number formats
 */
export const convertNumber = async (value: string, toFormat: string) => {
  let command: string[];
  
  switch (toFormat) {
    case 'hex':
      command = ['to-hex', value];
      break;
    case 'dec':
      command = ['to-dec', value];
      break;
    case 'wei':
      command = ['to-wei', value];
      break;
    case 'ether':
      command = ['to-ether', value];
      break;
    case 'gwei':
      command = ['to-unit', value, 'gwei'];
      break;
    default:
      throw new Error(`Unsupported conversion format: ${toFormat}`);
  }
  
  return executeFoundryCommand('cast', command);
};

/**
 * Generate a new wallet
 */
export const generateWallet = async (withMnemonic?: boolean) => {
  const args = ['wallet', 'new'];
  if (withMnemonic) args.push('--mnemonic');
  
  return executeFoundryCommand('cast', args);
};

/**
 * Get address from private key
 */
export const getAddressFromPrivateKey = async (privateKey: string) => {
  const args = ['wallet', 'address', privateKey];
  return executeFoundryCommand('cast', args);
};

/**
 * Sign a message
 */
export const signMessage = async (message: string, privateKey: string) => {
  const args = ['wallet', 'sign', `"${message}"`, '--private-key', privateKey];
  return executeFoundryCommand('cast', args);
};

/**
 * Calculate function selector
 */
export const getFunctionSelector = async (functionSignature: string) => {
  const args = ['sig', `"${functionSignature}"`];
  return executeFoundryCommand('cast', args);
};

/**
 * Encode function call data
 */
export const encodeCallData = async (functionSignature: string, functionArgs?: string[]) => {
  const args = ['calldata', `"${functionSignature}"`];
  if (functionArgs && functionArgs.length > 0) {
    args.push(...functionArgs);
  }
  
  return executeFoundryCommand('cast', args);
};

/**
 * Decode transaction data
 */
export const decodeCallData = async (functionSignature: string, callData: string) => {
  const args = ['decode-calldata', `"${functionSignature}"`, callData];
  return executeFoundryCommand('cast', args);
};

/**
 * Get storage slot value
 */
export const getStorageValue = async (
  contractAddress: string,
  storageSlot: string,
  rpcUrl: string,
  block?: string
) => {
  const args = ['storage', contractAddress, storageSlot, '--rpc-url', rpcUrl];
  if (block) args.push('--block', block);
  
  return executeFoundryCommand('cast', args);
};
