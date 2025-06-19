# Smart Contract MCP

![NPM Version](https://img.shields.io/npm/v/@tamago-labs/smart-contract-mcp)

**Smart Contract MCP** is a comprehensive Model Context Protocol (MCP) server implementation for smart contract development via CLI. It supports **Aptos CLI**, **Sui CLI**, and **Foundry** for comprehensive blockchain development across Move and Solidity ecosystems.

## Features
- **50+ MCP tools** ready to use for smart contract development
- **Multi-blockchain support**: Aptos (Move), Sui (Move), Ethereum/EVM (Solidity)
- **Comprehensive CLI integration** for Move and Solidity smart contract development and testing
- **Production-ready tools** for deployment, testing, and contract interaction

## Using with Claude Desktop

1. Install Claude Desktop if you haven't already
2. Open Claude Desktop settings
3. Add the Smart Contract MCP to your configuration:

```json
{
  "mcpServers": {
    "smart-contract-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@tamago-labs/smart-contract-mcp"
      ],
      "disabled": false
    }
  }
}
```

## Prerequisites

Before using this MCP, ensure you have the required CLI tools installed:

### For Ethereum/EVM Development (Foundry)
```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### For Aptos Development
```bash
# Install Aptos CLI
curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3
```

### For Sui Development
```bash
# Install Sui CLI
cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui
```

## Available Tools

### Foundry CLI Integration (Ethereum/EVM)

#### Project Management
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `foundry_cli_init` | Initialize a new Foundry project | "Create a new Solidity project called 'my-defi-protocol'" |
| `foundry_cli_build` | Compile smart contracts using Forge | "Compile my smart contracts with optimization" |
| `foundry_cli_test` | Run smart contract tests | "Run all tests with gas reporting" |
| `foundry_cli_clean` | Clean build artifacts and cache | "Clean all build files" |
| `foundry_cli_format` | Format Solidity code | "Format all Solidity files in my project" |

#### Deployment & Contract Interaction
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `foundry_cli_deploy` | Deploy smart contracts to networks | "Deploy MyToken contract to mainnet" |
| `foundry_cli_call` | Call read-only contract functions | "Check token balance of address 0x123..." |
| `foundry_cli_send` | Send transactions to contracts | "Transfer 100 tokens to address 0x456..." |
| `foundry_cli_verify` | Verify contracts on Etherscan | "Verify MyToken contract on Etherscan" |

#### Network & Blockchain Query
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `foundry_cli_get_balance` | Get ETH balance of accounts | "Check ETH balance of 0x123..." |
| `foundry_cli_get_transaction` | Get transaction details by hash | "Get details for transaction 0xabc..." |
| `foundry_cli_get_receipt` | Get transaction receipt | "Get receipt for transaction 0xdef..." |
| `foundry_cli_get_block` | Get block information | "Get latest block information" |
| `foundry_cli_get_gas_price` | Get current gas price | "Check current gas price on mainnet" |
| `foundry_cli_estimate_gas` | Estimate gas for transactions | "Estimate gas for token transfer" |
| `foundry_cli_get_chain_id` | Get network chain ID | "Get chain ID for current network" |

#### Utilities & Conversion
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `foundry_cli_convert` | Convert between number formats | "Convert 1 ETH to wei" |
| `foundry_cli_generate_wallet` | Generate new wallet/keypair | "Create a new Ethereum wallet" |
| `foundry_cli_get_address` | Get address from private key | "Get address for my private key" |
| `foundry_cli_sign_message` | Sign messages with private key | "Sign 'Hello World' message" |
| `foundry_cli_get_selector` | Calculate function selectors | "Get selector for transfer(address,uint256)" |
| `foundry_cli_encode_data` | Encode function call data | "Encode transfer function call data" |
| `foundry_cli_decode_data` | Decode transaction data | "Decode transaction input data" |
| `foundry_cli_get_storage` | Get contract storage values | "Read storage slot 0 from contract" |

### Aptos CLI Integration

#### Account Management
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `aptos_cli_create_account` | Create a new Aptos account | "Create a new account with name 'myaccount'" | 
| `aptos_cli_get_account_info` | Get account information | "Get info for account 0x123..." |
| `aptos_cli_list_accounts` | List all configured accounts | "Show all my accounts" |
| `aptos_cli_get_account_resources` | Get account resources | "Show resources for account 0x123..." |
| `aptos_cli_get_account_modules` | Get published modules | "Show modules published by 0x123..." |

#### Move Package Management
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `aptos_cli_move_init` | Initialize a new Move package | "Create a new Move project called 'my_contract'" |
| `aptos_cli_move_compile` | Compile a Move package | "Compile the package in ./contracts/" |
| `aptos_cli_move_test` | Run Move package tests | "Run tests for my smart contract" |
| `aptos_cli_move_publish` | Publish Move package | "Deploy my contract to mainnet" |
| `aptos_cli_move_run` | Run a Move function | "Call function 0x1::coin::transfer with args [100, 0x456...]" |
| `aptos_cli_move_clean` | Clean build artifacts | "Clean build files for my project" |
| `aptos_cli_move_download` | Download dependencies | "Download dependencies for my Move project" |
| `aptos_cli_move_prove` | Formal verification | "Prove correctness of my Move code" |

#### Configuration & Network
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `aptos_cli_get_network` | Get current network configuration | "Which network am I connected to?" |
| `aptos_cli_set_network` | Set current network | "Switch to testnet" |
| `aptos_cli_init_config` | Initialize Aptos configuration | "Initialize CLI config for testnet" |
| `aptos_cli_list_profiles` | List all profiles | "Show all my CLI profiles" |
| `aptos_cli_switch_profile` | Switch to different profile | "Switch to profile 'testnet'" |
| `aptos_cli_show_global_config` | Show global config | "Show my global CLI configuration" |
| `aptos_cli_get_node_info` | Get node information | "Get current node info" |
| `aptos_cli_get_ledger_info` | Get ledger information | "Show current ledger state" |
| `aptos_cli_get_network_peers` | Get network peers | "Show network peer information" |

#### Query & Transactions
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `aptos_cli_get_transaction_by_hash` | Get transaction by hash | "Get transaction details for 0xabc..." |
| `aptos_cli_get_transaction_by_version` | Get transaction by version | "Get transaction at version 12345" |
| `aptos_cli_get_account_transactions` | Get account transaction history | "Show recent transactions for 0x123..." |
| `aptos_cli_simulate_transaction` | Simulate transaction | "Simulate calling function without executing" |
| `aptos_cli_get_events_by_creation_number` | Get events by creation number | "Get events with creation number 5" |
| `aptos_cli_get_events_by_handle` | Get events by handle | "Get coin transfer events" |

### Sui CLI Integration
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `sui_cli_publish` | Deploy a Move package to the network | "Deploy my Move package to mainnet" |
| `sui_cli_move_test` | Run Move unit tests | "Run tests for my smart contract" |
| `sui_cli_move_new` | Create a new Move project | "Create a new Move project called my-defi-protocol" |
| `sui_cli_move_build` | Build a Move package | "Build the package in this folder" |
| `sui_cli_call` | Call a Move function | "Call function update_price with args [10000]" |
| `sui_cli_active_env` | Get currently active Sui network | "Which network am I connected to?" |
| `sui_cli_active_address` | Get active address on Sui CLI | "What's my active CLI address?" |
| `sui_cli_addresses` | List all wallet addresses and aliases | "List all my CLI wallets" |
| `sui_cli_switch_address` | Change the active address | "Switch to address 0x456..." |
| `sui_cli_switch_env` | Switch network environment | "Switch to testnet" |
| `sui_cli_envs` | List all configured environments | "Show all network configurations" |

## License
This project is licensed under the MIT License.
