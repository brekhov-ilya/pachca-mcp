import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import { ChatMemberRoleFilter } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { cursor, limit, positiveInt, safeTool } from '../common.js';

const schema = z.object({
	chatId: positiveInt,
	role: z.enum(ChatMemberRoleFilter).optional(),
	limit,
	cursor,
});

export function registerChatMembersListTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'chat-members-list',
		{
			description: 'Получение списка участников чата Pachca',
			inputSchema: schema,
		},
		safeTool(async ({ chatId, role, limit, cursor }) =>
			toJsonResult(await client.members.listMembers(chatId, { role, limit, cursor })),
		),
	);
}
