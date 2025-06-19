import { InitProjectTool, BuildProjectTool, TestProjectTool, CleanProjectTool, FormatCodeTool } from './project_tool';
import { DeployContractTool, CallContractTool, SendTransactionTool, VerifyContractTool } from './deploy_tool';
import { GetBalanceTool, GetTransactionTool, GetTransactionReceiptTool, GetBlockTool, GetGasPriceTool, EstimateGasTool, GetChainIdTool } from './network_tool';
import { ConvertNumberTool, GenerateWalletTool, GetAddressTool, SignMessageTool, GetFunctionSelectorTool, EncodeCallDataTool, DecodeCallDataTool, GetStorageTool } from './utils_tool';

export const FoundryCliTools = {
    // Project Management
    "InitProjectTool": InitProjectTool,
    "BuildProjectTool": BuildProjectTool,
    "TestProjectTool": TestProjectTool,
    "CleanProjectTool": CleanProjectTool,
    "FormatCodeTool": FormatCodeTool,
    
    // Deployment & Contract Interaction
    "DeployContractTool": DeployContractTool,
    "CallContractTool": CallContractTool,
    "SendTransactionTool": SendTransactionTool,
    "VerifyContractTool": VerifyContractTool,
    
    // Network & Blockchain Query
    "GetBalanceTool": GetBalanceTool,
    "GetTransactionTool": GetTransactionTool,
    "GetTransactionReceiptTool": GetTransactionReceiptTool,
    "GetBlockTool": GetBlockTool,
    "GetGasPriceTool": GetGasPriceTool,
    "EstimateGasTool": EstimateGasTool,
    "GetChainIdTool": GetChainIdTool,
    
    // Utilities & Conversion
    "ConvertNumberTool": ConvertNumberTool,
    "GenerateWalletTool": GenerateWalletTool,
    "GetAddressTool": GetAddressTool,
    "SignMessageTool": SignMessageTool,
    "GetFunctionSelectorTool": GetFunctionSelectorTool,
    "EncodeCallDataTool": EncodeCallDataTool,
    "DecodeCallDataTool": DecodeCallDataTool,
    "GetStorageTool": GetStorageTool
};
