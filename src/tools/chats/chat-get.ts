import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';

const schema = z.object({
	chatId: positiveInt,
});

export function registerChatGetTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'chat-get',
		{
			description: 'Получение чата по идентификатору',
			inputSchema: schema,
		},
		safeTool(async ({ chatId }) => toJsonResult(await client.chats.getChat(chatId))),
	);
}
