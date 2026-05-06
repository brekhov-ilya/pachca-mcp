import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';

const schema = z.object({
	name: z.string().min(1),
	memberIds: z.array(positiveInt).optional(),
	groupTagIds: z.array(positiveInt).optional(),
	channel: z.boolean().optional(),
	public: z.boolean().optional(),
});

export function registerChatCreateTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'chat-create',
		{
			description: 'Создание нового чата или канала Pachca',
			inputSchema: schema,
		},
		safeTool(async ({ name, memberIds, groupTagIds, channel, public: isPublic }) =>
			toJsonResult(
				await client.chats.createChat({
					chat: { name, memberIds, groupTagIds, channel, public: isPublic },
				}),
			),
		),
	);
}
