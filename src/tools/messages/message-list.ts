import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import { MessageSortField } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { cursor, limit, order, positiveInt, safeTool } from '../common.js';

const schema = z.object({
	chatId: positiveInt,
	limit,
	cursor,
	order,
});

export function registerMessageListTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'message-list',
		{
			description: 'Получение сообщений чата Pachca',
			inputSchema: schema,
		},
		safeTool(async ({ chatId, limit, cursor, order }) =>
			toJsonResult(
				await client.messages.listChatMessages({
					chatId,
					limit,
					cursor,
					order,
					sort: MessageSortField.Id,
				}),
			),
		),
	);
}
