import type { CallToolResult } from '@modelcontextprotocol/server';
import { SortOrder } from '@pachca/sdk';
import * as z from 'zod/v4';

import { redactSecrets, toErrorResult } from '../mcpResponse.js';

export type ToolHandler<T> = (args: T) => Promise<CallToolResult>;

export const positiveInt = z.number().int().positive();
export const limit = positiveInt.optional();
export const cursor = z.string().min(1).optional();
export const order = z.enum(SortOrder).optional();

export function safeTool<T>(handler: ToolHandler<T>): ToolHandler<T> {
	return async args => {
		try {
			return await handler(args);
		} catch (error) {
			return toErrorResult(error instanceof Error ? redactSecrets(error.message) : 'Unknown Pachca tool error');
		}
	};
}
