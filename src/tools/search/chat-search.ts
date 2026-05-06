import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { cursor, limit, safeTool } from '../common.js';

const schema = z.object({
	query: z.string().optional(),
	personal: z.boolean().optional(),
	limit,
	cursor,
});

export function registerChatSearchTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'chat-search',
		{
			description: 'Поиск чатов Pachca',
			inputSchema: schema,
		},
		safeTool(async args => toJsonResult(await client.search.searchChats(args))),
	);
}
