import { z } from "zod";

export interface McpTool {
    name: string;
    description: string;
    schema: any;
    handler: any;
}