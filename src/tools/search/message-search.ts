import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { cursor, limit, positiveInt, safeTool } from '../common.js';

const schema = z.object({
	query: z.string().optional(),
	chatIds: z.array(positiveInt).optional(),
	userIds: z.array(positiveInt).optional(),
	createdFrom: z.string().optional(),
	createdTo: z.string().optional(),
	limit,
	cursor,
});

export function registerMessageSearchTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'message-search',
		{
			description: 'Поиск сообщений Pachca',
			inputSchema: schema,
		},
		safeTool(async args => toJsonResult(await client.search.searchMessages(args))),
	);
}
