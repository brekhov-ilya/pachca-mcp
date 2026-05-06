import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { cursor, limit, positiveInt, safeTool } from '../common.js';

const schema = z.object({
	messageId: positiveInt,
	limit,
	cursor,
});

export function registerReactionListTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'reaction-list',
		{
			description: 'Получение реакций сообщения Pachca',
			inputSchema: schema,
		},
		safeTool(async ({ messageId, limit, cursor }) =>
			toJsonResult(await client.reactions.listReactions(messageId, { limit, cursor })),
		),
	);
}
