import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface CliResult {
  stdout: string;
  stderr: string;
  success: boolean;
  parsed?: any;
}

/**
 * Executes a Foundry CLI command (forge, cast, anvil)
 * @param command The main Foundry command (forge, cast, anvil)
 * @param args Array of arguments to pass to the command
 * @returns Result of the command execution
 */
export const executeFoundryCommand = async (
  command: string,
  args: string[]
): Promise<CliResult> => {
  try {
    // Sanitize inputs to prevent command injection
    const sanitizedArgs = args.map(arg => {
      // Basic sanitization - more robust in production
      return arg.replace(/[;&|`$]/g, '');
    });
    
    const fullCommand = `${command} ${sanitizedArgs.join(' ')}`; 
    
    const { stdout, stderr } = await execAsync(fullCommand, {
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer for large outputs
    });
    
    // Try to parse JSON if applicable
    let parsed = undefined;
    if (stdout.trim().startsWith('{') || stdout.trim().startsWith('[')) {
      try {
        parsed = JSON.parse(stdout);
      } catch (e) {
        // Not valid JSON, ignore
      }
    }
    
    return {
      stdout,
      stderr,
      success: true,
      parsed
    };
  } catch (error: any) {
    console.error('Error executing Foundry command:', error);
    return {
      stdout: error.stdout || '',
      stderr: error.stderr || error.message || 'Unknown error executing CLI command',
      success: false
    };
  }
};

/**
 * Check if Foundry is installed
 */
export const checkFoundryInstallation = async (): Promise<boolean> => {
  try {
    const result = await executeFoundryCommand('forge', ['--version']);
    return result.success;
  } catch {
    return false;
  }
};
