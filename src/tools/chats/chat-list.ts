import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import { ChatAvailability } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { cursor, limit, order, safeTool } from '../common.js';

const schema = z.object({
	personal: z.boolean().optional(),
	limit,
	cursor,
	order,
	availability: z.enum(ChatAvailability).optional(),
	lastMessageAtAfter: z.string().optional(),
	lastMessageAtBefore: z.string().optional(),
});

export function registerChatListTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'chat-list',
		{
			description: 'Получение списка чатов',
			inputSchema: schema,
		},
		safeTool(async args => toJsonResult(await client.chats.listChats(args))),
	);
}
